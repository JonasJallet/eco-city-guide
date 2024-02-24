import { getDataSource } from "../../database";
import User from "../../entities/user";
import UserSession from "../../entities/userSession";

describe("User", () => {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("saveNewSession", () => {
    it("should save a new user session", async () => {
      const user: User = new User({
        // propriétés du constructor user, pourquoi n'a t-il pas besoin de toutes les propriétés User ?
        firstName: "test",
        lastName: "Test",
        email: "me@test.com",
        password: "123456712345",
      });
      const savedSession = await UserSession.saveNewSession(user);
      expect(savedSession).toBeDefined();
    });

    it("if email is not define, it shouldn't save a newSession", async () => {
      const user: User = new User({
        firstName: "test",
        lastName: "Test",
        email: "",
        password: "123456712345",
      });
      await expect(UserSession.saveNewSession(user)).rejects.toThrow(
        "The email must be specified"
      );
    });
  });
});
