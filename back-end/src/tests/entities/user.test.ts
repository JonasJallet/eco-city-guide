import User from "../../entities/user";
import { newUsers } from "./user.dataset";
import { resetDatabase } from "../resetDatabase";

describe("User", () => {
  resetDatabase();

  describe("getUserWithEmailAndPassword", () => {
    const { email, password } = {
      email: "me@test.com",
      password: "123456azerty",
    };

    describe("when email matches no user in database", () => {
      it("should throws error", async () => {
        await expect(
          User.getUserWithEmailAndPassword({ email, password })
        ).rejects.toThrow("INVALID_CREDENTIALS");
      });
    });

    describe("when email matches user in database", () => {
      describe("when password does not match password in database", () => {
        it("should throws error", async () => {
          await User.saveNewUser({
            email,
            firstName: "Arnaud",
            lastName: "Renaud",
            password: "otherpassword",
          });

          await expect(
            User.getUserWithEmailAndPassword({ email, password })
          ).rejects.toThrow("INVALID_CREDENTIALS");
        });
      });

      describe("when password matches password in database", () => {
        it("should returns user", async () => {
          const user = await User.saveNewUser({
            email,
            firstName: "Arnaud",
            lastName: "Renaud",
            password,
          });

          await expect(
            User.getUserWithEmailAndPassword({ email, password })
          ).resolves.toEqual(user);
        });
      });
    });
  });

  describe("saveNewUser", () => {
    it("should return new user", async () => {
      const result = await User.saveNewUser(newUsers[0]);

      expect(result).toEqual(
        expect.objectContaining({
          email: "mail-user1@test.com",
          firstName: "UserName1",
          lastName: "UserLastName1",
          role: "user",
        })
      );
    });
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      const createdUsers: any[] = [];
      for (const user of newUsers) {
        createdUsers.push(await User.saveNewUser(user));
      }
      const users = await User.getUsers();
      expect(users).toEqual(createdUsers);
    });
  });

  describe("getUserById", () => {
    it("should return one user", async () => {
      const createdUser = await User.saveNewUser(newUsers[0]);
      const userId = createdUser.id;
      const user = await User.getUserById(userId);
      expect(user).toEqual(createdUser);
    });
  });

  describe("deleteUser", () => {
    it("should delete user by id", async () => {
      const createdUser = await User.saveNewUser(newUsers[1]);
      const userId = createdUser.id;
      const deletedUser = await User.deleteUser(userId);
      expect(deletedUser).toEqual(createdUser);
    });
  });

  describe("updateUser", () => {
    it("should return updated user", async () => {
      const createdUser = await User.saveNewUser(newUsers[2]);
      const userId = createdUser.id;
      const partialUser = { firstName: "updated-firstname" };
      const updatedUser = await User.updateUser(userId, partialUser);
      expect(updatedUser.firstName).toEqual(partialUser.firstName);
    });

    it("should throw error if user does not exist", async () => {
      const userId = "e66e6099-5c31-4e32-b5ec-fd0743730f18";
      const partialUser = { firstName: "updated-firstname" };
      await expect(User.updateUser(userId, partialUser)).rejects.toThrow(
        "User with ID e66e6099-5c31-4e32-b5ec-fd0743730f18 does not exist."
      );
    });
  });
});
