import { Place } from "@/gql/graphql";

export function getSurroundingPlacesAroundPoint(
  places: Place[],
  coordinates: [number, number],
  zoomLevel: number,
  category?: string,
  city?: string,
): Place[] {
  const sliceSize = 0.15 / zoomLevel;

  const minLatitude = coordinates[0] - sliceSize;
  const maxLatitude = coordinates[0] + sliceSize;
  const minLongitude = coordinates[1] - sliceSize;
  const maxLongitude = coordinates[1] + sliceSize;

  const surroundingPlaces = places.filter(
    (place: Place) =>
      place.coordinates.coordinates[0] >= minLatitude &&
      place.coordinates.coordinates[0] <= maxLatitude &&
      place.coordinates.coordinates[1] >= minLongitude &&
      place.coordinates.coordinates[1] <= maxLongitude,
  );

  return surroundingPlaces;
}
