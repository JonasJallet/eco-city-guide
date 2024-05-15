import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import { Place } from "@/gql/graphql";
import { useContext } from "react";

export default function PlaceContent({
  selectedPlace,
}: {
  selectedPlace: Place;
}) {
  const { place, setPlace } = useContext(PlaceContext) as PlaceContextType;
  setPlace(selectedPlace);

  return (
    <div className="flex flex-col h-screen bg-white transition-all w-80">
      {/* <div className="p-4 border-b border-gray-200">
        <button onClick={onClose} className="text-gray-500 hover:text-green-500">
          Retour aux favoris
        </button>
      </div> */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{selectedPlace.name}</h2>
        <p className="text-gray-600 mb-1">Ville: {selectedPlace.city.name}</p>
        <p className="text-gray-600 mb-1">Adresse: {selectedPlace.address}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
}
