import { DeepPartial } from "typeorm";
import { TypeFactory } from "interface-forge";
import { Geometry } from "geojson";
import { faker } from "@faker-js/faker";

const minLatitude = 48.85499;
const maxLatitude = 48.86251;
const minLongitude = 2.225056;
const maxLongitude = 2.415;

interface PlaceInterface {
  name: string;
  description: string;
  coordinates: Geometry;
  address: string;
  city: string;
}

export class PlaceMockFactory {
  private typeFactory: TypeFactory<DeepPartial<PlaceInterface>>;

  constructor() {
    this.typeFactory = new TypeFactory<DeepPartial<PlaceInterface>>(
      async () => ({
        name: "Eco-" + faker.commerce.department(),
        description: faker.lorem.lines(),
        coordinates: {
          type: "Point",
          coordinates: [
            faker.location.latitude({ min: minLatitude, max: maxLatitude }),
            faker.location.longitude({ min: minLongitude, max: maxLongitude }),
          ],
        },
        address: faker.location.streetAddress({ useFullAddress: true }),
        city: faker.location.city(),
      })
    );
  }

  async create(): Promise<DeepPartial<PlaceInterface>> {
    return await this.typeFactory.build();
  }

  async createMany(number: number): Promise<DeepPartial<PlaceInterface>[]> {
    const places = [];
    for (let i = 0; i < number; i++) {
      const placeData = await this.create();
      places.push(placeData);
    }

    return places;
  }
}
