import { getDataSource } from "../../database";
import Place from "../../entities/place";
import { places } from "./place.dataset";
import { Point } from "typeorm";

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

  const createNewPlace = async (placeData: {
    name: string;
    description: string;
    city: string;
    address: string;
    coordinates: Point;
  }) => {
    return await Place.saveNewPlace({
      ...placeData,
      categoryIds: [],
      ownerId: null,
    });
  };

  describe("saveNewPlace", () => {
    it("create place and returns it", async () => {
      const createdPlace = await createNewPlace(places[0]);
      expect(createdPlace).toMatchObject(places[0]);
      const place = await Place.getPlaceById(createdPlace.id);
      expect(place.id).toEqual(createdPlace.id);
    });
  });

  describe("getPlaces", () => {
    it("should return all places", async () => {
      const createdPlaces = await Promise.all(places.map(createNewPlace));
      const getPlaces = await Place.getPlaces();
      expect(getPlaces.length).toEqual(createdPlaces.length);
    });
  });

  describe("getPlaceById", () => {
    it("should return one place by id", async () => {
      const createdPlace = await createNewPlace(places[0]);
      const placeId = createdPlace.id;
      const place = await Place.getPlaceById(placeId);
      expect(place).toBeDefined();
      expect(place.id).toEqual(createdPlace.id);
    });
  });

  describe("deletePlace", () => {
    it("should delete place by id", async () => {
      const createdPlace = await createNewPlace(places[1]);
      const placeId = createdPlace.id;
      const deletedPlace = await Place.deletePlace(placeId);
      expect(deletedPlace).toBeDefined();
      await expect(Place.getPlaceById(placeId)).rejects.toThrow();
    });
  });

  describe("updatePlace", () => {
    it("should return updated place", async () => {
      const createdPlace = await createNewPlace(places[2]);
      const placeId = createdPlace.id;
      const partialPlace = { name: "updated-name" };
      const updatedPlace = await Place.updatePlace(placeId, partialPlace);
      expect(updatedPlace).toBeDefined();
      expect(updatedPlace.name).toEqual(partialPlace.name);
    });

    it("should throw error if place does not exist", async () => {
      const placeId = "e66e6099-5c31-4e32-b5ec-fd0743730f18";
      const partialPlace = { name: "updated-name" };
      await expect(Place.updatePlace(placeId, partialPlace)).rejects.toThrow(
          "Place with ID e66e6099-5c31-4e32-b5ec-fd0743730f18 does not exist."
      );
    });
  });
});
