import { Place } from "@/gql/graphql";
import React from "react";

export default function FavoritesByCategoryContent({
  favorites,
  onBack,
}: {
  favorites: Place[];
  onBack: () => void;
}) {
  return (
    <div className="h-screen bg-white transition-all w-80 border-r-blue-100 shadow-lg shadow-gray-300 border-r-[1px]">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
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
      <div className="p-2">
        {favorites.map((favorite, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
            <p className="text-xl font-semibold mb-2">{favorite.name}</p>
            <p className="text-gray-600 mb-1">City: {favorite.city.name}</p>
            <p className="text-gray-600">Address: {favorite.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
