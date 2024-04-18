import { Point } from "typeorm";
import { faker } from "@faker-js/faker";
import { resetDatabase } from "../resetDatabase";
import { getDataSource } from "../../database";
import { newPlacesDataset } from "./place.dataset";
import Place from "../../entities/place";
import Category from "../../entities/category";

describe("Place", () => {
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

  const createNewPlace = async (placeData: {
    name: string;
    description: string;
    address: string;
    coordinates: Point;
  }) => {
    return await Place.saveNewPlace({
      ...placeData,
      city: "Lyon",
      categoryIds: [(await createNewCategory({ name: faker.lorem.word() })).id],
      ownerId: null,
    });
  };

  describe("getPlaces", () => {
    it("should return all places", async () => {
      const cityList = ["Marseille", "Lyon", "Paris"];
      const createdPlaces = [];

      for (let i = 0; i < cityList.length; i++) {
        const datasetIndex = i % newPlacesDataset.length;
        const placeData = newPlacesDataset[datasetIndex];
        const city = cityList[i];
        const createdPlace = await createNewPlace(placeData);
        createdPlace.city.name = city;
        createdPlaces.push(createdPlace);
      }

      const getPlaces = await Place.getPlaces();
      expect(getPlaces.length).toEqual(createdPlaces.length);
    });
  });

  describe("getPlaceById", () => {
    it("should return one place by id", async () => {
      const createdPlace = await createNewPlace(newPlacesDataset[0]);
      const placeId = createdPlace.id;
      const place = await Place.getPlaceById(placeId);
      expect(place).toBeDefined();
      expect(place.id).toEqual(createdPlace.id);
    });
  });

  describe("saveNewPlace", () => {
    it("create place and returns it", async () => {
      const createdPlace = await createNewPlace(newPlacesDataset[0]);
      expect(createdPlace).toMatchObject(newPlacesDataset[0]);
      const place = await Place.getPlaceById(createdPlace.id);
      expect(place.id).toEqual(createdPlace.id);
    });

    it("should throw error if trying to create place with same name and coordinates", async () => {
      await createNewPlace(newPlacesDataset[0]);
      const duplicatePlace = createNewPlace(newPlacesDataset[0]);
      await expect(duplicatePlace).rejects.toThrow();
    });
  });

  describe("deletePlace", () => {
    it("should delete place by id", async () => {
      const createdPlace = await createNewPlace(newPlacesDataset[1]);
      const placeId = createdPlace.id;
      const deletedPlace = await Place.deletePlace(placeId);
      expect(deletedPlace).toBeDefined();
      await expect(Place.getPlaceById(placeId)).rejects.toThrow();
    });
  });

  describe("updatePlace", () => {
    it("should return updated place", async () => {
      const createdPlace = await createNewPlace(newPlacesDataset[2]);
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
        "Place with ID e66e6099-5c31-4e32-b5ec-fd0743730f18 does not exist.",
      );
    });
  });
});
