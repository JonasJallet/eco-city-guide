import { getDataSource } from "../../database";
import { Point } from "typeorm";
import { faker } from "@faker-js/faker";
import Place from "../../entities/place";

describe("Place", () => {
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

  describe("saveNewPlace", () => {
    it("creates ad and returns it", async () => {
      const placeToCreate = {
        name: "Eco-" + faker.commerce.department(),
        description: faker.lorem.lines(),
        address: faker.location.city(),
        city: faker.location.streetAddress({ useFullAddress: true }),
        coordinates: {
          type: "Point",
          coordinates: [32, 65],
        } as Point,
      };

      const returnedPlace = await Place.saveNewPlace({
        ...placeToCreate,
        categoryIds: [],
        ownerId: null,
      });

      expect(returnedPlace).toMatchObject(placeToCreate);

      const place = await Place.getPlaceById(returnedPlace.id);
      expect(place.id).toEqual(returnedPlace.id);
    });
  });
});
