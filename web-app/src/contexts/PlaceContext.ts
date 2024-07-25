import { Place } from "@/gql/generate/graphql";
import { createContext } from "react";

export type PlaceContextType = {
  place: Place | undefined;
  setPlace: (place: Place | undefined) => void;
};

const PlaceContext = createContext<PlaceContextType>({
  place: undefined,
  setPlace: () => {},
});

export default PlaceContext;
