import { DeepPartial, Point } from "typeorm";
import { TypeFactory } from "interface-forge";
import { Geometry } from "geojson";

interface CityInterface {
  name: string;
  coordinates: Geometry;
}

export class CityMockFactory {
  private typeFactory: TypeFactory<DeepPartial<CityInterface>>;

  constructor() {
    this.typeFactory = new TypeFactory<DeepPartial<CityInterface>>(
      async () => ({
        name: "",
        coordinates: {
          type: "Point",
          coordinates: [0, 0],
        },
      })
    );
  }

  async create(
    name: string,
    coordinates: Point
  ): Promise<DeepPartial<CityInterface>> {
    return await this.typeFactory.build({ name, coordinates });
  }
}
