import { faker } from "@faker-js/faker";
import { Point } from "typeorm"

const minLatitude = 48.85499;
const maxLatitude = 48.86251;
const minLongitude = 2.225056;
const maxLongitude = 2.415;

export const places = [
  {
    name: "Eco-" + faker.commerce.department(),
    description: faker.lorem.lines(),
    city: faker.location.city(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    coordinates: {
      type: "Point",
      coordinates: [
        faker.location.latitude({ min: minLatitude, max: maxLatitude }),
        faker.location.longitude({ min: minLongitude, max: maxLongitude }),
      ],
    } as Point,
  },
  {
    name: "Eco-" + faker.commerce.department(),
    description: faker.lorem.lines(),
    city: faker.location.city(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    coordinates: {
      type: "Point",
      coordinates: [
        faker.location.latitude({ min: minLatitude, max: maxLatitude }),
        faker.location.longitude({ min: minLongitude, max: maxLongitude }),
      ],
    } as Point,
  },
  {
    name: "Eco-" + faker.commerce.department(),
    description: faker.lorem.lines(),
    city: faker.location.city(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    coordinates: {
      type: "Point",
      coordinates: [
        faker.location.latitude({ min: minLatitude, max: maxLatitude }),
        faker.location.longitude({ min: minLongitude, max: maxLongitude }),
      ],
    } as Point,
  },
];
