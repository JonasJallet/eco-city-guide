import Place from "../entities/place";
import DataSource from "../data-source";
import { PlaceMockFactory } from "../factories/placeMockFactory";

export async function createPlaceMock(){  
    await DataSource.initialize();
    const placeRepository = DataSource.getRepository(Place);
    const placeData = await new PlaceMockFactory().create();
    await placeRepository.save(placeData);
    console.log('Generated Place Data saved to the database.');
  }

  createPlaceMock()