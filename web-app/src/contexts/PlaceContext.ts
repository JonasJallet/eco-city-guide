import { Place } from "@/gql/graphql";
import { createContext } from "react";

export type PlaceContextType = {
  place: Place | undefined;
  setPlace: (place: Place) => void;
};

const PlaceContext = createContext<PlaceContextType>({
  place: undefined,
  setPlace: () => {},
});

export default PlaceContext;
