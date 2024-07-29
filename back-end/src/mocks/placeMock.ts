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
    for (let i = 0; i < 60; i++) {
      const placeData: DeepPartial<PlaceInterface> = await placeFactory.create([
        category.id,
      ]);

      const city = await City.getCityByName("Paris");
      if (city === null) {
        process.stdout.write("City not found: Paris");
        continue;
      }

      placeData.city = city;
      placesData.push(placeData);
    }

    const database = await getDataSource();
    const placeRepository = database.getRepository(Place);
    await placeRepository.save(placesData);
  }
}

createPlacesWithCategory()
  .then(() => {
    console.log("\x1b[32mGenerated Places Data saved to the database.\x1b[0m");
  })
  .catch((error) => {
    console.error("\x1b[31mError creating places:\x1b[0m", error);
  });
