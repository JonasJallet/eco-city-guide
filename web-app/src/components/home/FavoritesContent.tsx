import { FavoritesQuery, Place } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import FavoritesByCategory from "./FavoritesByCategory";

const GET_FAVORITES = gql`
  query favorites {
    myFavorites {
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

  const { data, loading } = useQuery<FavoritesQuery>(
    GET_FAVORITES
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToList = () => {
    setSelectedCategory(null);
  };


  const organizeFavoritePlaceByCategories = (places: Place[]): Record<string, Place[]> => {
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

  const listOfCategories = (organizedFavorites: Record<string, Place[]>, handleCategoryClick: (category: string) => void) => {
    return Object.entries(organizedFavorites).map(([category, places]) => (
      <div key={category} onClick={() => handleCategoryClick(category)} className="p-3 cursor-pointer flex justify-content-center hover:bg-slate-100 hover:text-green-500">
        <div className="flex items-start w-full">
          <svg className="w-4 h-4 mt-2 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <div>
            <h2>{category}</h2>
            <span className="text-gray-500">{places.length} lieux</span>
          </div>
        </div>
      </div>
    ));
  };
  

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data available.</p>;

  const { favoritesPlaces } = data.myFavorites;
  const organizedFavorites = organizeFavoritePlaceByCategories(favoritesPlaces);

  return (
    <div className="h-screen bg-white transition-all w-80 border-r-blue-100 shadow-lg shadow-gray-300 border-r-[1px]">
      {!selectedCategory && (
        <div className="flex items-center justify-center">
          <h1 className="text-center text-2xl text-gray-600 font-bold font-sans cursor-default mt-4 mb-2">My Favorites</h1>
        </div>
      )}
      {selectedCategory ? (
        <FavoritesByCategory favorites={organizedFavorites[selectedCategory]} onBack={handleBackToList}/>
      ) : (
        listOfCategories(organizedFavorites, handleCategoryClick)
      )}
    </div>
  );
}
