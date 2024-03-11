import User from "../entities/user";
import { getDataSource } from "../database";
import { hash } from "bcrypt";
import { UserInterface, UserMockFactory } from "../factories/userMockFactory";
import { DeepPartial } from "typeorm";

export async function createUserMock(): Promise<DeepPartial<UserInterface>[]> {
  const database = await getDataSource();
  const userRepository = database.getRepository(User);
  const webAdministrator = await new UserMockFactory().create(
    "Ganondorf",
    "Dragmire",
    "web-admin@gmail.com",
    "password",
    "webAdministrator"
  );
  if (webAdministrator.hashedPassword) {
    webAdministrator.hashedPassword = await hash(
      webAdministrator.hashedPassword,
      10
    );
  }
  const cityAdministrator = await new UserMockFactory().create(
    "Gandalf",
    "Le gris",
    "city-admin@gmail.com",
    "password",
    "cityAdministrator"
  );
  if (cityAdministrator.hashedPassword) {
    cityAdministrator.hashedPassword = await hash(
      cityAdministrator.hashedPassword,
      10
    );
  }
  const user = await new UserMockFactory().create(
    "Pac",
    "Man",
    "user@gmail.com",
    "password",
    "user"
  );
  if (user.hashedPassword) {
    user.hashedPassword = await hash(user.hashedPassword, 10);
  }
  const createdUsers : DeepPartial<UserInterface>[] = [webAdministrator, cityAdministrator, user];
  await userRepository.save(createdUsers);

  return createdUsers;
}

createUserMock()
    .then(() => {
      process.stdout.write("Generated Users Data saved to the database.");
    })
    .catch((error) => {
      process.stdout.write("Error creating users:", error);
    });
