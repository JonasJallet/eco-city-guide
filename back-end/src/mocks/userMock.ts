import User from "../entities/user";
import { getDataSource } from "../database";
import { hash } from "bcrypt";
import { UserMockFactory } from "../factories/userMockFactory";
import {createPlaceMock} from "./placeMock";

export async function createUserMock() {
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

  await userRepository.save([webAdministrator, cityAdministrator, user]);
}

createUserMock()
    .then(() => {
      process.stdout.write("Generated Users Data saved to the database.");
    })
    .catch((error) => {
      process.stdout.write("Error creating users:", error);
    });
