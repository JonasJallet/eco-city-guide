import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import PlaceEdition from "./Place";
import EditPlaceForm from "../../forms/edit/EditPlaceForm";
import CreatePlaceForm from "@/components/forms/create/CreatePlaceForm";
import { Place, PlacesQuery } from "@/gql/generate/graphql";
import { GET_PLACES } from "@/gql/requests/queries";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";

function PlacesTable() {
  const [isEditionPanelAdmin, setIsEditionPanelAdmin] = useState(false);
  const [isCreationPanelAdmin, setIsCreationPanelAdmin] = useState(false);
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const [searchPlace, setSearchPlace] = useState("");

  useEffect(() => {
    if (isEditionPanelAdmin || isCreationPanelAdmin) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isEditionPanelAdmin, isCreationPanelAdmin]);

  const openEditionPanelAdmin = (place: Place) => {
    setCurrentPlace(place);
    setIsEditionPanelAdmin(true);
  };

  const closeEditionPanelAdmin = () => {
    setIsEditionPanelAdmin(false);
    setCurrentPlace(null);
  };

  const {
    data: placesData,
    loading,
    error,
    refetch,
  } = useQuery<PlacesQuery>(GET_PLACES, {});

  if (loading) return <Loader />;

  if (error) return toast.error(error.message);

  const sortedPlaces = [...(placesData?.places || [])].sort((a, b) => {
    const firstElementIncludes =
      a.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
      a.city.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
      a.address.toLowerCase().includes(searchPlace.toLowerCase());

    const secondElementIncludes =
      b.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
      b.city.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
      b.address.toLowerCase().includes(searchPlace.toLowerCase());

    if (firstElementIncludes && !secondElementIncludes) return -1;
    if (!firstElementIncludes && secondElementIncludes) return 1;
    return 0;
  });

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
          onClick={() => setIsCreationPanelAdmin(true)}
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
                openEditionPanelAdmin={openEditionPanelAdmin}
                refetch={refetch}
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
        <div className="fixed inset-0 z-50 bg-gray-800 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-2 rounded-lg shadow-lg max-w-md max-h-[90vh] overflow-y-auto">
            <CreatePlaceForm
              setIsCreationPanelAdmin={setIsCreationPanelAdmin}
              refetchPlaceData={refetch}
            />
          </div>
        </div>
      )}
      {isEditionPanelAdmin && currentPlace && (
        <div className="fixed inset-0 z-50 bg-gray-800 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-2 rounded-lg shadow-lg max-w-md max-h-[90vh] overflow-y-auto">
            <EditPlaceForm
              place={currentPlace}
              setIsEditionPanelAdmin={closeEditionPanelAdmin}
              refetch={refetch}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacesTable;
