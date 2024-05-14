import { Place } from "@/gql/graphql";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const REMOVE_FAVORITE_PLACE = gql`
  mutation RemoveFavoritePlace($placeId: String!) {
    removeFavoritePlace(placeId: $placeId) {
      favoritesPlaces {
        __typename
        id
        name
        address
        city {
          __typename
          id
          name
        }
      }
    }
  }
`;

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
  const [removeFavoritePlaceMutation] = useMutation(REMOVE_FAVORITE_PLACE);

  const handleRemoveFavorite = async (placeId: string) => {
    try {
      await removeFavoritePlaceMutation({
        variables: { placeId },
      });
      setFavorites(favorites.filter((favorite) => favorite.id !== placeId));
      refetchFavorites();
      // TODO Snackbar Success removing favorite place
    } catch (error) {
      // TODO Snackbar Error removing favorite place
    }
  };

  return (
    <div className="h-screen bg-white w-80 overflow-y-auto">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          <span>Back to Favorites</span>
        </button>
      </div>
      <div className="flex flex-col px-8 py-2 border-b border-gray-200">
        <h2 className="text-lg">{selectedCategory}</h2>
        <span className="text-gray-500">{favorites.length} places</span>
      </div>
      <div
        className="mt-2 mb-2
      "
      >
        {favorites.map((favorite, index) => (
          <div
            key={index}
            className="hover:bg-gray-100 p-3 mr-3 ml-3 my-2 rounded-xl cursor-pointer hover:text-green-500"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{favorite.name}</p>
              <button
                onClick={() => handleRemoveFavorite(favorite.id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-1">City : {favorite.city.name}</p>
            <p className="text-gray-600">Address : {favorite.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
