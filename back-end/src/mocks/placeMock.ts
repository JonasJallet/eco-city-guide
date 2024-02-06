import Place from "../entities/place";
import DataSource from "../data-source";
import { PlaceMockFactory } from "../factories/placeMockFactory";

export async function createPlaceMock() {
  await DataSource.initialize();
  const placeRepository = DataSource.getRepository(Place);
  const placeData = await new PlaceMockFactory().createMany(20);
  await placeRepository.save(placeData);
  process.stdout.write("Generated Places Data saved to the database.");
}

createPlaceMock();
