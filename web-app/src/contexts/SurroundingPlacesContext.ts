import { Category, Place } from "@/gql/generate/graphql";
import { createContext } from "react";

export type SurroundingPlacesContextType = {
  surroundingPlaces: Place[];
  setSurroundingPlaces: (surroundingPlaces: Place[]) => void;
  category: Category | undefined;
  setCategory: (category: Category | undefined) => void;
};

const SurroundingPlacesContext = createContext<SurroundingPlacesContextType>({
  surroundingPlaces: [],
  setSurroundingPlaces: () => {},
  category: undefined,
  setCategory: () => {},
});
export default SurroundingPlacesContext;
