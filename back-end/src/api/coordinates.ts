import axios from "axios";
import { Point } from "typeorm";

export const getCoordinates = async (address: string) => {
  try {
    const response = await axios.get(
      "https://api-adresse.data.gouv.fr/search",
      {
        params: {
          q: address,
        },
      }
    );
    const coordinates = response.data.features[0].geometry.coordinates;
    const longitude = coordinates[0];
    const latitude = coordinates[1];
    const result: Point = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    return result;
  } catch (error) {
    throw new Error("Error fetching coordinates: " + error);
  }
};
