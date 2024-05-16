import { Place } from "@/gql/graphql";

export default function PlaceContent({
  selectedPlace,
}: {
  selectedPlace: Place;
}) {
  return (
    <div className="flex flex-col h-screen w-80">
      <p>Ville: {selectedPlace.city.name}</p>
    </div>
  );
}
