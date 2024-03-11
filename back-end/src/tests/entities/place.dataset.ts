import { faker } from "@faker-js/faker";
import { Point } from "typeorm"

export function createPlaceDataset(numberOfPlaces: number) {
  const places = [];
  for (let i = 0; i < numberOfPlaces; i++) {
    places.push({
      name: "Eco-" + faker.commerce.department(),
      description: faker.lorem.lines(),
      city: faker.location.city(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      coordinates: {
        type: "Point",
        coordinates: [48, 2],
      } as Point,
    });
  }
  return places;
}

export const places = createPlaceDataset(3);
