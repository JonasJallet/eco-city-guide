import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { randomBytes } from "crypto";

import User from "./user";

@Entity()
class UserSession extends BaseEntity {
  @PrimaryColumn({ length: 32 })
  id!: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User;

  constructor(user?: User) {
    super();

    if (user) {
      this.id = randomBytes(16).toString("hex");
      this.user = user;
    }
  }

  static async saveNewSession(user: User): Promise<UserSession> {
    const newSession = new UserSession(user);
    return await newSession.save();
  }

  static async getUserSessionByUserId(userId: string): Promise<UserSession> {
    const userSession = await this.findOne({
      where: { user: { id: userId } },
      relations: ["user"], // Inclure la relation si nécessaire
    });
    if (!userSession) {
      throw new Error(`UserSession with userId ${userId} does not exist.`);
    }
    return userSession;
  }

  static async deleteSession(user: User): Promise<UserSession> {
    const actualSession = await this.getUserSessionByUserId(user.id);
    // let session = user.sessions;
    // console.log("je passe aussi ici", actualSession);
    return actualSession;
  }
}

export default UserSession;
