import { Place } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { GET_FAVORITES } from "@/gql/queries";
import FavoritesByCategory from "./FavoritesByCategory";
import Loader from "../loader/Loader";
import { MdClose } from "react-icons/md";
import { SideBarContentEnum } from "./sideBarContent.type";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { IoMdList } from "react-icons/io";

export default function FavoritesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data, loading, refetch } = useQuery(GET_FAVORITES);
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToList = () => {
    setSelectedCategory(null);
  };

  const handleCloseButton = () => {
    setSideBarEnum(SideBarContentEnum.NO_CONTENT);
  };

  let organizedFavorites: Record<string, Place[]> = {};

  const organizeFavoritePlaceByCategories = (
    places: Place[],
  ): Record<string, Place[]> => {
    const organizedFavorites: Record<string, Place[]> = {};

    places.forEach((place: Place) => {
      place.categories.forEach((category) => {
        const categoryName = category.name;
        if (!organizedFavorites[categoryName]) {
          organizedFavorites[categoryName] = [];
        }
        organizedFavorites[categoryName].push(place);
      });
    });

    return organizedFavorites;
  };

  const ListOfCategories = ({
    organizedFavorites,
    handleCategoryClick,
  }: {
    organizedFavorites: Record<string, Place[]>;
    handleCategoryClick: (category: string) => void;
  }) => {
    return (
      <div className="mt-14 mb-2">
        {Object.entries(organizedFavorites)
          .sort()
          .map(([category, places]) => (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="mr-3 ml-3 rounded-xl p-3 cursor-pointer flex justify-content-center hover:bg-gray-100 hover:text-tertiary_color"
            >
              <div className="flex items-start w-full">
                <div className="p-3 text-xl">
                  <IoMdList />
                </div>
                <div>
                  <h2>{category}</h2>
                  <span className="text-gray-500">
                    {places.length} {places.length > 1 ? "lieux" : "lieu"}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  if (data) {
    const { favoritesPlaces } = data.myProfile;
    organizedFavorites = organizeFavoritePlaceByCategories(favoritesPlaces);
  }

  return (
    <div className="flex flex-col h-screen w-80">
      <div className="overflow-y-auto">
        {!selectedCategory && (
          <div>
            <button
              onClick={handleCloseButton}
              className="text-2xl text-gray-500 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-tertiary_color p-2 m-1 z-20"
            >
              <MdClose />
            </button>
            <div className="flex items-center justify-center fixed bg-white w-80 border-b border-gray-200">
              <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
                Mes Favoris
              </p>
            </div>
          </div>
        )}

        {loading && <Loader />}
        {data && data.myProfile.favoritesPlaces.length === 0 && (
          <div className="flex justify-center pt-12 m-8">
            <p>Vous n'avez pas encore de favoris.</p>
          </div>
        )}

        {data && (
          <>
            {selectedCategory ? (
              <FavoritesByCategory
                favorites={organizedFavorites[selectedCategory]}
                selectedCategory={selectedCategory}
                onBack={handleBackToList}
                refetchFavorites={refetch}
              />
            ) : (
              <ListOfCategories
                organizedFavorites={organizedFavorites}
                handleCategoryClick={handleCategoryClick}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
