import { useState } from "react";
import { useQuery } from "@apollo/client";
import PlaceEdition from "./Place";
import PlaceEditionForm from "./PlaceEditionForm";
import CreatePlaceForm from "@/components/forms/CreatePlaceForm";
import { Place } from "@/gql/generate/graphql";
import { GET_PLACES } from "@/gql/requests/queries";

function PlacesTable() {
  const [isEditionPanelAdmin, setIsEditionPanelAdmin] = useState(false);
  const [isCreationPanelAdmin, setIsCreationPanelAdmin] = useState(false);
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const [searchPlace, setSearchPlace] = useState("");

  const setIsEditionModeGlobal = (place: Place) => {
    setCurrentPlace(place);
    setIsEditionPanelAdmin(true);
  };

  const closeEditionMode = () => {
    setIsEditionPanelAdmin(false);
    setCurrentPlace(null);
  };

  const {
    data: placesData,
    loading,
    error,
    refetch,
  } = useQuery(GET_PLACES, {});

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  const sortedPlaces = [...(placesData?.places || [])].sort((a, b) => {
    const aIncludes =
      a.name.toLowerCase().includes(searchPlace) ||
      a.city.name.toLowerCase().includes(searchPlace) ||
      a.address.toLowerCase().includes(searchPlace);

    const bIncludes =
      b.name.toLowerCase().includes(searchPlace) ||
      b.city.name.toLowerCase().includes(searchPlace) ||
      b.address.toLowerCase().includes(searchPlace);

    if (aIncludes && !bIncludes) return -1;
    if (!aIncludes && bIncludes) return 1;
    return 0;
  });
  console.log(sortedPlaces);
  return (
    <div className="px-3 py-4 overflow-x-scroll">
      <div className="mb-3 flex justify-start items-center">
        <p className="font-semibold">Rechercher</p>
        <input
          value={searchPlace}
          onChange={(e) => setSearchPlace(e.target.value)}
          className="ml-2 px-4 py-1 rounded-3xl hover:bg-input_hover_bg focus:outline-none"
          type="text"
          name="searchPlace"
        />
        <button
          onClick={() => {
            setIsCreationPanelAdmin(true);
          }}
          className="mx-3 px-2 font-semibold bg-white text-blue-400 border-2 border-blue-400 rounded-3xl duration-200 hover:text-white hover:border-blue-400 hover:bg-blue-400"
        >
          Créer
        </button>
      </div>
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr className="border-b">
            <th className="p-3 px-5">Nom</th>
            <th className="p-3 px-5">Adresse</th>
            <th className="p-3 px-5">Catégories</th>
            <th className="p-3 px-5">Ville</th>
            <th className="p-3 px-5">Description</th>
            <th className="p-3 px-5">Actions</th>
          </tr>
          {!placesData?.places || placesData?.places.length !== 0 ? (
            sortedPlaces?.map((place: Place) => (
              <PlaceEdition
                key={place.id}
                place={place}
                setIsEditionModeGlobal={setIsEditionModeGlobal}
              />
            ))
          ) : (
            <tr>
              <th colSpan={7} className="py-5 px-2 text-red-600">
                Pas de données lieux
              </th>
            </tr>
          )}
        </tbody>
      </table>
      {isCreationPanelAdmin && (
        <div className="w-screen h-screen bg-white fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
          <div className="border border-gray-300 rounded-2xl">
            <CreatePlaceForm
              setIsCreationPanelAdmin={setIsCreationPanelAdmin}
              refetch={refetch}
            />
          </div>
        </div>
      )}
      {isEditionPanelAdmin && currentPlace && (
        <div className="w-screen h-screen fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
          <PlaceEditionForm
            key={currentPlace.id}
            place={currentPlace}
            setIsEditionPanelAdmin={closeEditionMode}
          />
        </div>
      )}
    </div>
  );
}

export default PlacesTable;
