import Place from "../entities/place";
import DataSource from "../data-source";
import { PlaceMockFactory } from "../factories/placeMockFactory";

export async function createPlaceMock(){  
    await DataSource.initialize();
    const placeRepository = DataSource.getRepository(Place);
    const placeData = await new PlaceMockFactory().create();
    console.log('Generated Place Data:', placeData);
    await placeRepository.save(placeData);
    console.log('Mock data saved to the database.');
  }

  createPlaceMock()