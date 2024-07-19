import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CreateUser, UpdateUser, SignInUser } from "../types/user.args";
import { compare, hash } from "bcrypt";
import UserSession from "./userSession";
import Place from "./place";
import { validate } from "class-validator";

export enum UserRole {
  webAdministrator = "webAdministrator",
  cityAdministrator = "cityAdministrator",
  user = "user",
}

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

  @Field()
  get userInitials(): string {
    return `${this.firstName[0].toUpperCase()}${this.lastName[0].toUpperCase()}`;
  }

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.user,
  })
  @Field()
  role: UserRole = UserRole.user;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  hashedPassword!: string;

  @OneToMany(() => UserSession, (session) => session.user)
  sessions!: UserSession[];

  @OneToMany(() => Place, (place) => place.owner)
  ownedPlaces!: Place[];

  @JoinTable({ name: "UserFavoritePlaces" })
  @ManyToMany(() => Place, (place) => place.usersWithFavorite, { eager: true })
  @Field(() => [Place])
  favoritesPlaces!: Place[];

  constructor(user?: CreateUser) {
    super();

    if (user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.hashedPassword = user.password;
    }
  }

  static async saveNewUser(userData: CreateUser): Promise<User> {
    userData.password = await hash(userData.password, 10);
    const newUser = new User(userData);
    const existingEmail = await User.getUserByEmail(userData.email);
    if (existingEmail) {
      throw new Error("Un compte avec cet email existe déjà.");
    }

    return await newUser.save();
  }

  static async getUsers(): Promise<User[]> {
    return await User.find();
  }

  static async getUserById(id: string): Promise<User> {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new Error(`User with ID ${id} does not exist.`);
    }
    return user;
  }

  private static async getUserByEmail(email: string): Promise<User | null> {
    return await User.findOneBy({ email });
  }

  static async deleteUser(id: string): Promise<User> {
    const user = await User.getUserById(id);
    await User.delete(id);
    return user;
  }

  static async updateUser(id: string, partialUser: UpdateUser): Promise<User> {
    const user = await User.getUserById(id);

    if (partialUser.password && user.hashedPassword !== partialUser.password) {
      partialUser.password = await hash(partialUser.password, 10);
    }
    if (partialUser.email && user.email !== partialUser.email) {
      const userWithEmailAlreadyUsed: null | User = await User.getUserByEmail(
        partialUser.email,
      );
      if (userWithEmailAlreadyUsed) {
        throw new Error("Un compte avec cet email existe déjà.");
      }
    }
    const newDataUser = {
      firstName: partialUser.firstName,
      lastName: partialUser.lastName,
      email: partialUser.email,
      hashedPassword: partialUser.password,
    };
    Object.assign(user, newDataUser);
    await user.save();
    await user.reload();
    return user;
  }

  static async getUserWithEmailAndPassword({
    email,
    password,
  }: SignInUser): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await compare(password, user.hashedPassword))) {
      throw new Error("Email ou mot de passe incorrect.");
    }
    return user;
  }

  static async signIn({
    email,
    password,
  }: SignInUser): Promise<{ user: User; session: UserSession }> {
    const user = await this.getUserWithEmailAndPassword({ email, password });
    const session = await UserSession.saveNewSession(user);
    return { user, session };
  }

  static async signOut(
    user: User,
  ): Promise<{ user: User; sessions: UserSession[] }> {
    let sessions = await UserSession.getUserSessionsByUserId(user.id);
    await UserSession.deleteSessions(sessions);
    return { user, sessions };
  }

  static async getUserWithSessionId(sessionId: string): Promise<User | null> {
    const session = await UserSession.findOne({
      where: { id: sessionId },
      relations: { user: true },
    });
    if (!session) {
      return null;
    }
    return session.user;
  }

  static async addFavoritePlace(
    userId: string,
    placeId: string,
  ): Promise<User> {
    const user = await this.getUserById(userId);
    const place = await Place.getPlaceById(placeId);
    (user.favoritesPlaces as Place[]).push(place);
    await user.save();

    return user;
  }

  static async deleteFavoritePlace(
    userId: string,
    placeId: string,
  ): Promise<User> {
    const user = await this.getUserById(userId);
    user.favoritesPlaces = user.favoritesPlaces.filter(
      (place) => place.id !== placeId,
    );
    await user.save();

    return user;
  }

  static async isInFavorites(
    userId: string,
    placeId: string,
  ): Promise<boolean> {
    const user = await this.getUserById(userId);
    return user.favoritesPlaces.some((place) => place.id === placeId);
  }
}

export default User;
