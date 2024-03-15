import User, { UserRole } from "../entities/user";
import Place from "../entities/place";
import { getDataSource } from "../database";
import { hash } from "bcrypt";
import { DeepPartial } from "typeorm";
import { faker } from "@faker-js/faker";

async function hashUserPassword(user: DeepPartial<User>): Promise<void> {
  if (user.hashedPassword) {
    user.hashedPassword = await hash(user.hashedPassword, 10);
  }
}

export async function createUserMock(): Promise<DeepPartial<User>[]> {
  const database = await getDataSource();
  const userRepository = database.getRepository(User);
  const places: Place[] = await Place.find();

  const usersData: Array<DeepPartial<User>> = [
    {
      firstName: "Ganondorf",
      lastName: "Dragmire",
      email: "web-admin@gmail.com",
      hashedPassword: "password",
      role: UserRole.webAdministrator,
    },
    {
      firstName: "Gandalf",
      lastName: "Le gris",
      email: "city-admin@gmail.com",
      hashedPassword: "password",
      role: UserRole.cityAdministrator,
    },
    {
      firstName: "user",
      lastName: "name",
      email: "user@gmail.com",
      hashedPassword: "password",
      role: UserRole.user,
      favoritesPlaces: faker.helpers.arrayElements(places, 20),
    },
    {
      firstName: "toto",
      lastName: "name",
      email: "toto@gmail.com",
      hashedPassword: "password",
      role: UserRole.user,
      favoritesPlaces: faker.helpers.arrayElements(places, 20),
    },
  ];

  await Promise.all(usersData.map(hashUserPassword));

  return await userRepository.save(usersData);
}

createUserMock()
  .then(() => {
    process.stdout.write("Generated Users Data saved to the database.");
  })
  .catch((error) => {
    process.stdout.write("Error creating users:", error);
  });
