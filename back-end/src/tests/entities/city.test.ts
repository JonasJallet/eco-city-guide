import { resetDatabaseAndCache } from "../resetDatabaseAndCache";
import City from "../../entities/city";

const sampleListOfCities = ["Lyon", "Paris", "Marseille"];

describe("City", () => {
  resetDatabaseAndCache();
  const createNewCity = async (cityName: string) => {
    return await City.saveNewCity(cityName);
  };

  describe("getCities", () => {
    it("should return all categories", async () => {
      const createdCities = await Promise.all(
        sampleListOfCities.map(createNewCity),
      );
      const getCities = await City.getCities();
      expect(getCities.length).toEqual(createdCities.length);
    });
  });

  describe("getCityByName", () => {
    it("should return one category by id", async () => {
      const createdCity = await createNewCity(sampleListOfCities[0]);
      const cityName = createdCity.name;
      const city = await City.getCityByName(cityName);
      expect(city).toBeDefined();
      if (city) {
        expect(city.id).toEqual(createdCity.id);
      }
    });
  });

  describe("saveNewCity", () => {
    it("should create category and returns it", async () => {
      const createdCity = await createNewCity(sampleListOfCities[0]);
      const city = await City.getCityByName(createdCity.name);

      if (city) {
        expect(city.id).toEqual(createdCity.id);
      }
    });

    it("should throw error if trying to create category with same name", async () => {
      await createNewCity(sampleListOfCities[1]);
      const duplicateCityName = createNewCity(sampleListOfCities[1]);
      await expect(duplicateCityName).rejects.toThrow();
    });
  });
});
