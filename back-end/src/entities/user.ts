import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { ObjectType, Field, ID } from "type-graphql";
 import { CreateUser, UpdateUser } from "./user.args";  
 import { compare, hash } from "bcrypt";
  // import Comment from "./comment";
  // import Note from "./note";
  
  export enum UserRole {
    webAdminitrator = 'webAdministrator',
    cityAdministrator = 'cityAdministrator',
    user = 'user'
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

     // @Column()
    // @Field()
    // role! : 

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.user
      })
    @Field()
    role!: UserRole

    @Column()
    @Field()
    email!: string;

    @Column()
    @Field()
    hashedPassword!: string

    // @OneToMany(() => Bookmark, (bookmark) => bookmark.userID)
    // bookmarks!: Bookmark[];

    // @OneToMany(() => Place, (place) => place.userID)
    // places!: Place[];

    // @OneToMany(() => Note, (note) => note.userID)
    // notes!: Note[];

    // @OneToMany(() => Comment, (comment) => comment.userID)
    // comments!: Comment[];

    //!!session User!!\\
    // @OneToMany(() => UserSession, (session) => session.user)
    // sessions!: UserSession[];
  
  
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
        this.role = user.role;
       
        //this.bookmarks = user.bookmarks
        // this.comments = user.categoryIds;
        // this.notes = user.notes;
        //this.places = user.places
      }
    }
  

   static async saveNewUser(userData: CreateUser): Promise<User> {
    userData.password = await hash(userData.password, 10);
    const newUser = new User(userData);
    // TODO: return user-friendly error message when email already used
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
  
    getStringRepresentation(): string {
      return `${this.id} | ${this.firstName} | ${this.lastName} | ${this.email}`;
    }
  }
  
  export default User;