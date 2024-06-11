import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PlaceContext from "@/contexts/PlaceContext";
import { PlaceContextType } from "@/contexts/PlaceContext";
import { Category, Place } from "@/gql/graphql";
import { coordinates } from "@/pages/settings";

interface FavoriCardProps {
  id: string;
  name: string;
  address: string;
  coordinates: { type: "Point"; coordinates: coordinates };
  createdAt: Date;
  description: string;

  city: {
    id: string;
    name: string;
    coordinates: { type: "Point"; coordinates: coordinates };
  };
  categories: Category[];

  owner: {
    type: "User";
    id: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    userInitials: string;
    role: string;
    email: string;
    hashedPassword: string;
    favoritesPlaces: Place[];
  };
  RemoveFavori: (idPlace: string) => Promise<any>;
}

export default function FavoriCard({
  id,
  coordinates,
  createdAt,
  name,
  description,
  city,
  categories,
  owner,
  address,
  RemoveFavori,
}: FavoriCardProps) {
  const [clickedFavori, setClickedFavori] = useState(false);
  const router = useRouter();

  const { place, setPlace } = useContext(PlaceContext) as PlaceContextType;

  const handleCarteClick = () => {
    try {
      const newPlace: Place = {
        __typename: "Place",
        id: id,
        name: name,
        description: description,
        address: address,
        categories: categories,
        city: {
          __typename: "City",
          coordinates: city.coordinates,
          id: city.id,
          name: city.name,
        },
        coordinates: coordinates,
        createdAt: createdAt,
        owner: owner,
      };

      setPlace(newPlace);
      router.push("/home");
    } catch (e) {
      console.log(e);
    }
  };

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
                {city.name}
              </div>
            </div>
          </div>
          <h4 className="mt-3 font-semibold text-lg leading-tight">{name}</h4>
          <div
            className={`text-gray-600 text-xs ${
              clickedFavori ? "" : "truncate"
            }`}
          >
            {description}
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
                className="bg-red-400 rounded p-2 font-medium text-white ml-1"
                onClick={() => RemoveFavori(id)}
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
