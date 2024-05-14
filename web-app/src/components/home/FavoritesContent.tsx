import { FavoritesQuery, Place } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import FavoritesByCategory from "./FavoritesByCategory";
import Loader from "../loader/Loader";

const GET_FAVORITES = gql`
  query favorites {
    myProfile {
      favoritesPlaces {
        id
        createdAt
        address
        coordinates
        categories {
          id
          name
        }
        city {
          id
          name
          coordinates
        }
        description
        name
      }
    }
  }
`;

export default function FavoritesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, loading, refetch } = useQuery<FavoritesQuery>(GET_FAVORITES);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToList = () => {
    setSelectedCategory(null);
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

  const listOfCategories = (
    organizedFavorites: Record<string, Place[]>,
    handleCategoryClick: (category: string) => void,
  ) => {
    return (
      <div className="mt-16 mb-2">
        {Object.entries(organizedFavorites).sort().map(([category, places]) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="mr-3 ml-3 rounded-xl p-3 cursor-pointer flex justify-content-center hover:bg-gray-100 hover:text-green-500"
          >
            <div className="flex items-start w-full">
              <svg
                className="w-4 h-4 mt-2 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
              <div>
                <h2>{category}</h2>
                <span className="text-gray-500">{places.length} places</span>
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
    <div className="flex flex-col h-screen bg-white transition-all w-80">
      <div className="overflow-y-auto">
        {!selectedCategory && (
          <div className="flex items-center justify-center fixed bg-white w-80 border-b border-gray-200">
            <h1 className="text-center text-2xl text-gray-600 font-bold font-sans cursor-default mt-4 mb-2">
              My Favorites
            </h1>
          </div>
        )}

        {loading && <Loader />}
        {data && data.myProfile.favoritesPlaces.length === 0 && (
          <div className="flex justify-center m-8">
            <p>You don't have any favorites yet.</p>
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
              listOfCategories(organizedFavorites, handleCategoryClick)
            )}
          </>
        )}
      </div>
    </div>
  );
}
