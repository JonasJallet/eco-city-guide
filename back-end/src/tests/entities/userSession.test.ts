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
      await UserSession.saveNewSession(user);
      await UserSession.saveNewSession(user);
      expect(
        await UserSession.find({ where: { user: { id: user.id } } })
      ).toHaveLength(2);
    });
  });
});
