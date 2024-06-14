import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import PlaceContext from "@/contexts/PlaceContext";
import { PlaceContextType } from "@/contexts/PlaceContext";
import { Place } from "@/gql/graphql";

interface Props {
  favorite: Place;
  RemoveFavorite: (idPlace: string) => Promise<void>;
}

export default function FavoriteCard({ favorite, RemoveFavorite }: Props) {
  const [clickedFavorite, setClickedFavorite] = useState(false);
  const router = useRouter();

  const { place, setPlace } = useContext(PlaceContext) as PlaceContextType;

  const handleMapClick = (favorite: Place) => {
    setPlace(favorite);
    router.push("/home");
  };

  return (
    <div
      className="antialiased text-gray-900 cursor-pointer"
      onClick={() => setClickedFavorite(!clickedFavorite)}
    >
      <div className="bg-white rounded-lg overflow-hidden border w-56">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <i className={favorite.categories[0].icon}></i>
            <div className="flex items-center">
              <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                {favorite.city.name}
              </div>
            </div>
          </div>
          <h4 className="mt-3 font-semibold text-lg leading-tight">
            {favorite.name}
          </h4>
          <div
            className={`text-gray-600 text-xs ${
              clickedFavorite ? "" : "truncate"
            }`}
          >
            {favorite.description}
          </div>
          {clickedFavorite && (
            <div className="mt-2">
              <button
                aria-label="Voir le lieu sur la carte"
                className="bg-tertiary_color rounded p-2 font-medium text-white"
                onClick={() => handleMapClick(favorite)}
              >
                <div className="flex items-center">
                  Carte
                  <FaMapMarkerAlt className="ml-0.5" size={12} />
                </div>
              </button>
              <button
                aria-label="Retirer le lieu des favoris"
                className="bg-blue-600 rounded p-2 font-medium text-white ml-1"
                onClick={() => RemoveFavorite(favorite.id)}
              >
                Retirer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
