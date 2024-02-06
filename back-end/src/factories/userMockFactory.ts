import { DeepPartial } from "typeorm";
import { TypeFactory } from "interface-forge";

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  roles: string;
}

export class UserMockFactory {
  private typeFactory: TypeFactory<DeepPartial<UserInterface>>;

  constructor() {
    this.typeFactory = new TypeFactory<DeepPartial<UserInterface>>(
      async () => ({
        firstName: "",
        lastName: "",
        email: "",
        hashedPassword: "",
        roles: "",
      })
    );
  }

  async create(
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    roles: string
  ): Promise<DeepPartial<UserInterface>> {
    return await this.typeFactory.build({
      firstName,
      lastName,
      email,
      hashedPassword,
      roles,
    });
  }
}
