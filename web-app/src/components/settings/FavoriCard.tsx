import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

interface FavoriCardProps {
  name: string;
  description: string;
  city: string;
  idPlace: string;
  RemoveFavori: (idPlace: string) => Promise<any>;
}
export default function FavoriCard({
  name,
  description,
  city,
  idPlace,
  RemoveFavori,
}: FavoriCardProps) {
  const [clickedFavori, setClickedFavori] = useState(false);

  return (
    <div
      className="antialiased text-gray-900 cursor-pointer"
      onClick={() => setClickedFavori(!clickedFavori)}
    >
      <div className="bg-white rounded-lg overflow-hidden border w-56">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <MdOutlineRestaurantMenu />
            <div className="flex items-center">
              <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                {city}
              </div>
            </div>
          </div>
          <h4 className="mt-3 font-semibold text-lg leading-tight">{name}</h4>
          <div
            className={`text-gray-600 text-xs ${clickedFavori ? "" : "truncate"}`}
          >
            {description}
          </div>
          {clickedFavori && (
            <div className="mt-2">
              <button className="bg-tertiary_color rounded p-2 font-medium text-white">
                <div className="flex items-center">
                  Carte
                  <FaMapMarkerAlt className="ml-0.5" size={12} />
                </div>
              </button>
              <button
                className="bg-red-400 rounded p-2 font-medium text-white ml-1"
                onClick={() => RemoveFavori(idPlace)}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
