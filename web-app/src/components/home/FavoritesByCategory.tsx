import { Place } from "@/gql/graphql";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_FAVORITE_PLACE } from "@/gql/mutations";
import { SideBarContentEnum } from "./sideBarContent.type";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { MdArrowBack, MdClose } from "react-icons/md";
import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";

export default function FavoritesByCategoryContent({
  favorites: initialFavorites,
  selectedCategory,
  onBack,
  refetchFavorites,
}: {
  favorites: Place[];
  selectedCategory: string | null;
  onBack: () => void;
  refetchFavorites: () => void;
}) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [removeFavoritePlace] = useMutation(REMOVE_FAVORITE_PLACE);
  const { setPlace } = useContext(PlaceContext) as PlaceContextType;
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  const handleSelectedFavorite = (favorite: Place) => {
    setPlace(favorite);
  };

  const handleRemoveFavorite = async (
    placeId: string,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    try {
      await removeFavoritePlace({
        variables: { placeId },
      });
      setFavorites(favorites.filter((favorite) => favorite.id !== placeId));
      refetchFavorites();
      // TODO Snackbar Success removing favorite place
    } catch (error) {
      // TODO Snackbar Error removing favorite place
    }
  };

  const handleCloseButton = () => {
    setSideBarEnum(SideBarContentEnum.NO_CONTENT);
  };

  useEffect(() => {
    if (favorites.length === 0) {
      onBack();
    }
  }, [favorites]);

  return (
    <div className="h-screen bg-white w-80 overflow-y-auto">
      <div>
        <div className="flex justify-between">
          <button
            onClick={handleCloseButton}
            className="text-2xl text-gray-500 rounded-xl hover:bg-gray-100 hover:text-tertiary_color p-2 m-1"
          >
            <MdClose />
          </button>
          <button
            onClick={onBack}
            className="text-2xl text-gray-500 rounded-xl hover:bg-gray-100 hover:text-tertiary_color p-2 m-1"
          >
            <MdArrowBack />
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center items-start px-8 border-b border-gray-200">
        <p className="text-center text-2xl text-gray-600 font-bold font-sans cursor-default mb-2">
          {selectedCategory}
        </p>
        <span className="text-gray-500 ml-3">
          {favorites.length} {favorites.length > 1 ? "lieux" : "lieu"}
        </span>
      </div>
      <div className="mt-4 mb-2">
        {favorites.map((favorite, index) => (
          <div
            key={index}
            onClick={() => handleSelectedFavorite(favorite)}
            className="hover:bg-gray-100 p-3 mr-3 ml-3 my-2 rounded-xl cursor-pointer hover:text-tertiary_color"
          >
            <div className="flex justify-between items-center">
              <p className="text-md font-medium">{favorite.name}</p>
              <button
                onClick={(event) => handleRemoveFavorite(favorite.id, event)}
                className="text-2xl text-red-600 hover:text-red-800 p-2 z-20"
              >
                <MdClose />
              </button>
            </div>
            <p className="text-gray-600 mb-1">Ville : {favorite.city.name}</p>
            <p className="text-gray-600">Adresse : {favorite.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
