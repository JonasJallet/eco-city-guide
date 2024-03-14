import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CreateUser, UpdateUser, SignInUser } from "../types/user.args";
import { compare, hash } from "bcrypt";
import UserSession from "./userSession";
import Place from "./place";

export enum UserRole {
  webAdminitrator = "webAdministrator",
  cityAdministrator = "cityAdministrator",
  user = "user",
}

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

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
  places!: Place[];

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

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
      throw new Error("Account with this email already exist.");
    }
    const savedUser = await newUser.save();
    return savedUser;
  }

  static async getUsers(): Promise<User[]> {
    const users = await User.find();
    return users;
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
    Object.assign(user, partialUser);

    await user.save();
    user.reload();
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

  getStringRepresentation(): string {
    return `${this.id} | ${this.firstName} | ${this.lastName} | ${this.email}`;
  }
}

export default User;
