import {
  AddFavoritePlaceMutation,
  GetProfileQuery,
  Place,
  RemoveFavoritePlaceMutation,
} from "@/gql/generate/graphql";
import { useContext, useState } from "react";
import { SideBarContentEnum } from "./sideBarContent.type";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { MdClose, MdStar, MdStarBorder } from "react-icons/md";
import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import SurroundingPlacesContext, {
  SurroundingPlacesContextType,
} from "@/contexts/SurroundingPlacesContext";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_FAVORITE_PLACE,
  REMOVE_FAVORITE_PLACE,
} from "@/gql/requests/mutations";
import { GET_PROFILE, IS_IN_FAVORITES } from "@/gql/requests/queries";
import { useRouter } from "next/router";

export default function PlacesByCategoryContent() {
  const { surroundingPlaces, setSurroundingPlaces } = useContext(
    SurroundingPlacesContext,
  ) as SurroundingPlacesContextType;

  const { setPlace } = useContext(PlaceContext) as PlaceContextType;
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  const [favoriteStatus, setFavoriteStatus] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const { data: userData } = useQuery<GetProfileQuery>(GET_PROFILE);
  const router = useRouter();

  useQuery<{ isInFavorites: boolean }>(IS_IN_FAVORITES, {
    variables: { placeId: selectedPlace?.id },
    skip: !selectedPlace,
    onCompleted: (data) => {
      setFavoriteStatus((prev) => ({
        ...prev,
        [selectedPlace?.id || ""]: data.isInFavorites,
      }));
    },
  });

  const [addFavoritePlace] =
    useMutation<AddFavoritePlaceMutation>(ADD_FAVORITE_PLACE);

  const [removeFavoritePlace] = useMutation<RemoveFavoritePlaceMutation>(
    REMOVE_FAVORITE_PLACE,
  );

  const handleSelectedPlace = (place: Place) => {
    setPlace(place);
    setSideBarEnum(SideBarContentEnum.PLACE);
  };

  const handleCloseButton = () => {
    setSideBarEnum(SideBarContentEnum.NO_CONTENT);
  };

  const handleFavoriteToggle = async (
    place: Place,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    setSelectedPlace(place);

    if (!userData) {
      return router.push("/login/sign-in");
    }

    const currentStatus = favoriteStatus[place.id] || false;

    if (currentStatus) {
      await removeFavoritePlace({
        variables: { placeId: place.id },
        refetchQueries: [
          { query: IS_IN_FAVORITES, variables: { placeId: place.id } },
        ],
      });
      setFavoriteStatus((prev) => ({ ...prev, [place.id]: false }));
    } else {
      await addFavoritePlace({
        variables: { placeId: place.id },
        refetchQueries: [
          { query: IS_IN_FAVORITES, variables: { placeId: place.id } },
        ],
      });
      setFavoriteStatus((prev) => ({ ...prev, [place.id]: true }));
    }
  };

  return (
    <div className="h-screen bg-white w-80 overflow-y-auto">
      <div>
        <button
          onClick={handleCloseButton}
          className="text-2xl text-gray-500 rounded-xl hover:bg-gray-100 hover:text-tertiary_color p-2 m-1"
        >
          <MdClose />
        </button>
      </div>

      <div className="mt-4 mb-2">
        {surroundingPlaces.map((place, index) => (
          <div
            key={index}
            onClick={() => handleSelectedPlace(place)}
            className="hover:bg-gray-100 p-3 mr-3 ml-3 my-2 rounded-xl cursor-pointer hover:text-tertiary_color"
          >
            <div className="flex justify-between items-center">
              <p className="text-md font-medium">{place.name}</p>
              <button
                onClick={(event) => handleFavoriteToggle(place, event)}
                className="p-1 border border-yellow-500 text-yellow-500 rounded-xl hover:bg-white"
              >
                {favoriteStatus[place.id] ? (
                  <MdStar className="w-6 h-6" />
                ) : (
                  <MdStarBorder className="w-6 h-6" />
                )}
              </button>
            </div>
            <p className="text-gray-600 mb-1">Ville : {place.city.name}</p>
            <p className="text-gray-600">Adresse : {place.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
