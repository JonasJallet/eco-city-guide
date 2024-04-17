import { faker } from "@faker-js/faker";
import { resetDatabase } from "../resetDatabase";
import { getDataSource } from "../../database";
import User from "../../entities/user";
import Place from "../../entities/place";
import Category from "../../entities/category";
import { newUsersDataset } from "./user.dataset";
import { newPlacesDataset } from "./place.dataset";

describe("User", () => {
  resetDatabase();

  const createNewCategory = async (categoryData: {
    name: string;
  }): Promise<Category> => {
    const database = await getDataSource();
    const categoryRepository = database.getRepository(Category);
    return await categoryRepository.save(
      categoryRepository.create(categoryData),
    );
  };

  const createNewPlace = async () => {
    return await Place.saveNewPlace({
      ...newPlacesDataset[0],
      city: "Lyon",
      categoryIds: [(await createNewCategory({ name: faker.lorem.word() })).id],
      ownerId: null,
    });
  };

  describe("getUserWithEmailAndPassword", () => {
    const { email, password } = {
      email: "me@test.com",
      password: "123456azerty",
    };

    describe("when email matches no user in database", () => {
      it("should throws error", async () => {
        await expect(
          User.getUserWithEmailAndPassword({ email, password }),
        ).rejects.toThrow("Email ou mot de passe incorrect.");
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
            User.getUserWithEmailAndPassword({ email, password }),
          ).rejects.toThrow("Email ou mot de passe incorrect.");
        });
      });

      describe("when password matches password in database", () => {
        it("should returns user", async () => {
          const newUser = await User.saveNewUser({
            email,
            firstName: "Arnaud",
            lastName: "Renaud",
            password,
          });

          const user = { ...newUser, favoritesPlaces: [] };
          const userWithEMailAndPassword =
            await User.getUserWithEmailAndPassword({
              email,
              password,
            });

          await expect(
            User.getUserWithEmailAndPassword({ email, password }),
          ).resolves.toEqual(user);
        });
      });
    });
  });

  describe("saveNewUser", () => {
    it("should return new user", async () => {
      const result = await User.saveNewUser(newUsersDataset[0]);

      expect(result).toEqual(
        expect.objectContaining({
          email: "mail-user1@test.com",
          firstName: "UserName1",
          lastName: "UserLastName1",
          role: "user",
        }),
      );
    });
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      const createdUsers: any[] = [];
      for (const userDataset of newUsersDataset) {
        createdUsers.push(await User.saveNewUser(userDataset));
      }
      const users = await User.getUsers();
      expect(users.length).toEqual(createdUsers.length);
    });
  });

  describe("getUserById", () => {
    it("should return one user", async () => {
      const createdUser = await User.saveNewUser(newUsersDataset[0]);
      const userId = createdUser.id;
      const user = await User.getUserById(userId);
      expect(user).toBeDefined();
      expect(user.id).toEqual(createdUser.id);
    });
  });

  describe("deleteUser", () => {
    it("should delete user by id", async () => {
      const createdUser = await User.saveNewUser(newUsersDataset[1]);
      const userId = createdUser.id;
      const deletedUser = await User.deleteUser(userId);
      expect(deletedUser.id).toEqual(createdUser.id);
    });
  });

  describe("updateUser", () => {
    it("should return updated user", async () => {
      const createdUser = await User.saveNewUser(newUsersDataset[2]);
      const userId = createdUser.id;
      const partialUser = { firstName: "updated-firstname" };
      const updatedUser = await User.updateUser(userId, partialUser);
      expect(updatedUser.firstName).toEqual(partialUser.firstName);
    });

    it("should throw error if user does not exist", async () => {
      const userId = "e66e6099-5c31-4e32-b5ec-fd0743730f18";
      const partialUser = { firstName: "updated-firstname" };
      await expect(User.updateUser(userId, partialUser)).rejects.toThrow(
        "User with ID e66e6099-5c31-4e32-b5ec-fd0743730f18 does not exist.",
      );
    });
  });

  describe("addFavoritePlace", () => {
    it("should add a favorite place for the user", async () => {
      const user = await User.saveNewUser(newUsersDataset[0]);
      const place = await createNewPlace();
      const updatedUser = await User.addFavoritePlace(user.id, place.id);
      expect(updatedUser.favoritesPlaces.map((place) => place.id)).toContain(
        place.id,
      );
    });

    it("should throw error if user ID is invalid", async () => {
      const invalidUserId = "58d566a1-faf3-4fd1-9640-85f27c1a117a";
      const place = await createNewPlace();

      await expect(
        User.addFavoritePlace(invalidUserId, place.id),
      ).rejects.toThrow(`User with ID ${invalidUserId} does not exist.`);
    });

    it("should throw error if place ID is invalid", async () => {
      const user = await User.saveNewUser(newUsersDataset[0]);
      const invalidPlaceId = "7d8ad5a8-d51a-4ac5-aa81-3993db97ba17";

      await expect(
        User.addFavoritePlace(user.id, invalidPlaceId),
      ).rejects.toThrow(`Place with ID ${invalidPlaceId} does not exist.`);
    });
  });

  describe("deleteFavoritePlace", () => {
    it("should remove a favorite place for the user", async () => {
      const user = await User.saveNewUser(newUsersDataset[0]);
      const place = await createNewPlace();
      await User.addFavoritePlace(user.id, place.id);

      const updatedUser = await User.deleteFavoritePlace(user.id, place.id);
      expect(updatedUser.favoritesPlaces).not.toContainEqual(place);
    });
  });
});
