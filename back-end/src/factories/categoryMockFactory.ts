import { DeepPartial } from "typeorm";
import { TypeFactory } from "interface-forge";

interface CategoryInterface {
  name: string;
  icon: string;
}

export class CategoryMockFactory {
  private typeFactory: TypeFactory<DeepPartial<CategoryInterface>>;

  constructor() {
    this.typeFactory = new TypeFactory<DeepPartial<CategoryInterface>>(
      async () => ({
        name: "",
        icon: "",
      }),
    );
  }

  async create(
    name: string,
    icon: string,
  ): Promise<DeepPartial<CategoryInterface>> {
    return await this.typeFactory.build({ name, icon });
  }
}
