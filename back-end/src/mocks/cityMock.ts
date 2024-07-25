import City from "../entities/city";
import { getDataSource } from "../database";
import { getCoordinates } from "../api/coordinates";
import { CityMockFactory } from "../factories/cityMockFactory";

const cityList = ["Paris", "Lyon", "Marseille", "Nice"];

export async function createCityMock() {
  const database = await getDataSource();
  const cityRepository = database.getRepository(City);

  for (const cityName of cityList) {
    const coordinates = await getCoordinates(cityName);
    const cityData = await new CityMockFactory().create(cityName, coordinates);
    await cityRepository.save(cityData);
  }
}

createCityMock()
  .then(() => {
    console.log("\x1b[32mGenerated Cities Data saved to the database.\x1b[0m");
  })
  .catch((error) => {
    console.error("\x1b[31mError creating cities:\x1b[0m", error);
  });
