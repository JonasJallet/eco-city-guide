import { Place } from "@/gql/generate/graphql";
import { createContext } from "react";

export type SurroundingPlacesContextType = {
  surroundingPlaces: Place[] | [];
  setSurroundingPlaces: (surroundingPlaces: Place[]) => void;
};

const SurroundingPlacesContext = createContext<SurroundingPlacesContextType>({
  surroundingPlaces: [],
  setSurroundingPlaces: () => {},
});

export default SurroundingPlacesContext;
