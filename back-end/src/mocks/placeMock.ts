import Place from "../entities/place";
import { getDataSource } from "../database";
import { PlaceMockFactory } from "../factories/placeMockFactory";

export async function createPlaceMock(numberOfPlaces: number) {
  const database = await getDataSource();
  const placeRepository = database.getRepository(Place);
  const placeData = await new PlaceMockFactory().createMany(numberOfPlaces);
  await placeRepository.save(placeData);
}

createPlaceMock(20)
    .then(() => {
      process.stdout.write("Generated Places Data saved to the database.");
    })
    .catch((error) => {
      process.stdout.write("Error creating places:", error);
    });
