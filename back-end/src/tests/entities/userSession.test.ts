import User from "../../entities/user";
import UserSession from "../../entities/userSession";
import { resetDatabase } from "../resetDatabase";

describe("User", () => {
  resetDatabase();

  describe("saveNewSession", () => {
    it("should save a new user session", async () => {
      const user: User = new User({
        firstName: "test",
        lastName: "Test",
        email: "me@test.com",
        password: "123456712345",
      });
      await UserSession.saveNewSession(user);
      await UserSession.saveNewSession(user);
      const sessions = await UserSession.find({
        where: { user: { id: user.id } },
      });
      expect(sessions).toHaveLength(2);
    });
  });
});
