import { faker } from "@faker-js/faker";
import { Point } from "typeorm";

export function createPlaceDataset(numberOfPlaces: number) {
  const places = [];
  for (let i = 0; i < numberOfPlaces; i++) {
    places.push({
      name: "Eco-" + faker.commerce.department(),
      description: faker.lorem.lines(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      coordinates: {
        type: "Point",
        coordinates: [
          faker.location.latitude({ min: 2, max: 45 }),
          faker.location.longitude({ min: 2, max: 56 }),
        ],
      } as Point,
    });
  }
  return places;
}

export const newPlacesDataset = createPlaceDataset(3);
