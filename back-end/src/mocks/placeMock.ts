import Place from "../entities/place";
import { getDataSource } from "../database";
import { PlaceMockFactory } from "../factories/placeMockFactory";

export async function createPlaceMock() {
  const database = await getDataSource();
  const placeRepository = database.getRepository(Place);
  const placeData = await new PlaceMockFactory().createMany(20);
  await placeRepository.save(placeData);
  process.stdout.write("Generated Places Data saved to the database.");
}

createPlaceMock();
