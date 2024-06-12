import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import PlaceContext from "@/contexts/PlaceContext";
import { PlaceContextType } from "@/contexts/PlaceContext";
import { Place } from "@/gql/graphql";
import { favori } from "@/interfaces/setting";

interface FavoriCardProps {
  favori: favori;
  RemoveFavori: (idPlace: string) => Promise<void>;
}

export default function FavoriCard({ favori, RemoveFavori }: FavoriCardProps) {
  const [clickedFavori, setClickedFavori] = useState(false);
  const router = useRouter();

  const { place, setPlace } = useContext(PlaceContext) as PlaceContextType;

  const handleCarteClick = () => {
    try {
      const newPlace: Place = {
        __typename: "Place",
        id: favori.id,
        name: favori.name,
        description: favori.description,
        address: favori.address,
        categories: favori.categories,
        city: {
          __typename: "City",
          coordinates: favori.city.coordinates,
          id: favori.city.id,
          name: favori.city.name,
        },
        coordinates: favori.coordinates,
        createdAt: favori.createdAt,
        owner: favori.owner,
      };

      setPlace(newPlace);
      router.push("/home");
    } catch (e) {}
  };

  return (
    <div
      className="antialiased text-gray-900 cursor-pointer"
      onClick={() => setClickedFavori(!clickedFavori)}
    >
      <div className="bg-white rounded-lg overflow-hidden border w-56">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <i className={favori.categories[0].icon}></i>
            <div className="flex items-center">
              <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                {favori.city.name}
              </div>
            </div>
          </div>
          <h4 className="mt-3 font-semibold text-lg leading-tight">
            {favori.name}
          </h4>
          <div
            className={`text-gray-600 text-xs ${
              clickedFavori ? "" : "truncate"
            }`}
          >
            {favori.description}
          </div>
          {clickedFavori && (
            <div className="mt-2">
              <button
                className="bg-tertiary_color rounded p-2 font-medium text-white"
                onClick={() => handleCarteClick()}
              >
                <div className="flex items-center">
                  Carte
                  <FaMapMarkerAlt className="ml-0.5" size={12} />
                </div>
              </button>
              <button
                className="bg-blue-600 rounded p-2 font-medium text-white ml-1"
                onClick={() => RemoveFavori(favori.id)}
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
