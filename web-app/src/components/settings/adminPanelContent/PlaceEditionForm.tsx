import { Place, MutationUpdatePlaceArgs } from "@/gql/generate/graphql";
import { UPDATE_PLACE } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdClose } from "react-icons/md";

interface Props {
  place: Place;
  setIsEditionPanelAdmin: (isEditionPanelAdmin: boolean) => void;
}

function PlaceEditionForm({ place, setIsEditionPanelAdmin }: Props) {
  const [updatedPlace, setUpdatedPlace] = useState<Place>({
    ...place,
  });
  console.log(updatedPlace);
  const [
    UpdatePlaceMutation,
    { loading: loadingUpdatePlace, error: updatePlaceError },
  ] = useMutation<MutationUpdatePlaceArgs>(UPDATE_PLACE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await UpdatePlaceMutation({ variables: updatedPlace });
    } catch (error) {
      console.log(error);
    }
    setIsEditionPanelAdmin(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white px-2 z-10 overflow-hidden ">
      <div className="flex flex-col animate-fade items-center w-80 z-20 bg-white border border-gray-300 rounded-2xl">
        <button
          onClick={() => setIsEditionPanelAdmin(false)}
          className="self-start text-2xl text-gray-500 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-tertiary_color p-2 m-1 z-20"
        >
          <MdClose />
        </button>
        <div className="w-full">
          <div className="border-b border-gray-200">
            <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
              Modifier lieu
            </p>
          </div>
          <form
            className="pt-10 px-8"
            onSubmit={(event) => {
              handleFormSubmit(event);
            }}
          >
            <label>Nom</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              type="text"
              name="name"
              id="name"
              value={updatedPlace.name || ""}
              onChange={(event) => {
                setUpdatedPlace({
                  ...updatedPlace,
                  name: event.target.value,
                });
              }}
            />
            <label>Adresse</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              type="text"
              name="adresse"
              id="adresse"
              value={updatedPlace.address || ""}
              onChange={(event) => {
                setUpdatedPlace({
                  ...updatedPlace,
                  address: event.target.value,
                });
              }}
            />
            <label>Ville</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              type="text"
              name="cityName"
              id="cityName"
              value={updatedPlace.city.name || ""}
              onChange={(event) => {
                setUpdatedPlace({
                  ...updatedPlace,
                  city: {
                    ...updatedPlace.city,
                    name: event.target.value,
                  },
                });
              }}
            />
            <label>Coordonnées</label>
            <div className="flex justify-between">
              <input
                className="bg-white-200 pl-4 p-2 w-28 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
                type="number"
                name="cityName"
                id="cityName"
                value={updatedPlace.coordinates.coordinates[0] || ""}
                onChange={(event) => {
                  setUpdatedPlace({
                    ...updatedPlace,
                    coordinates: {
                      ...updatedPlace.coordinates,
                      coordinates: [
                        event.target.value,
                        updatedPlace.coordinates.coordinates[1],
                      ],
                    },
                  });
                }}
              />
              <input
                className="bg-white-200 pl-4 py-2 w-28 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
                type="number"
                name="cityName"
                id="cityName"
                value={updatedPlace.coordinates.coordinates[1] || ""}
                onChange={(event) => {
                  setUpdatedPlace({
                    ...updatedPlace,
                    coordinates: {
                      ...updatedPlace.coordinates,
                      coordinates: [
                        updatedPlace.coordinates.coordinates[0],
                        event.target.value,
                      ],
                    },
                  });
                }}
              />
            </div>
            <label htmlFor="description">Catégorie</label>
            <select className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"></select>
            <label>Description</label>
            <textarea
              className="w-full h-32 bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              value={updatedPlace.description}
              onChange={(event) => {
                setUpdatedPlace({
                  ...updatedPlace,
                  description: event.target.value,
                });
              }}
            />
            <button
              type="submit"
              className="flex items-center justify-center text-center w-full mt-6 mb-10 border bg-tertiary_color rounded-3xl px-4 py-2 text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
            >
              <GrUpdate className="text-xl" />
              <p className="ms-4 text-lg">Valider</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PlaceEditionForm;
