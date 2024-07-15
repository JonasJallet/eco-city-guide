import Place from "../entities/place";
import Category from "../entities/category";
import City from "../entities/city";
import { getDataSource } from "../database";
import {
  PlaceInterface,
  PlaceMockFactory,
} from "../factories/placeMockFactory";
import { DeepPartial } from "typeorm";

async function categories(): Promise<Category[]> {
  const database = await getDataSource();
  const categoryRepository = database.getRepository(Category);
  return await categoryRepository.find();
}

export async function createPlacesWithCategory() {
  const placeFactory = new PlaceMockFactory();

  for (const category of await categories()) {
    const placesData: DeepPartial<PlaceInterface>[] = [];
    for (let i = 0; i < 40; i++) {
      const placeData: DeepPartial<PlaceInterface> = await placeFactory.create([
        category.id,
      ]);
      placeData.city = await City.getCityByName("Paris");
      placesData.push(placeData);
    }

    const database = await getDataSource();
    const placeRepository = database.getRepository(Place);
    await placeRepository.save(placesData);
  }
}

createPlacesWithCategory()
  .then(() => {
    process.stdout.write("Generated Places Data saved to the database.");
  })
  .catch((error) => {
    process.stdout.write("Error creating places:", error);
  });
