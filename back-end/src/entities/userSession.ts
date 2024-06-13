import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { randomBytes } from "crypto";

import User from "./user";

@Entity()
class UserSession extends BaseEntity {
  @PrimaryColumn({ length: 32 })
  id!: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: "CASCADE",
  })
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

  static async getUserSessionsByUserId(userId: string): Promise<UserSession[]> {
    const userSession = await this.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    if (!userSession) {
      throw new Error(`UserSession with userId ${userId} does not exist.`);
    }
    return userSession;
  }

  static async deleteSessions(sessions: UserSession[]): Promise<UserSession[]> {
    for (let session of sessions) {
      await UserSession.delete(session.id);
    }
    return sessions;
  }
}

export default UserSession;
