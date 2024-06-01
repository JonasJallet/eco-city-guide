import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PlaceContext from "@/contexts/PlaceContext";
import { PlaceContextType } from "@/contexts/PlaceContext";
import { Place } from "@/gql/graphql";

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
  const router = useRouter();
  const place = useContext(PlaceContext) as PlaceContextType;

  useEffect(() => {
    console.log(place.place?.name, "place de PlaceContext");
  }, [place]);

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
                // onClick={() => handleCarteClick()} // Update place on click
              >
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

// const handleCarteClick = () => {
//   try {
//     const newPlace: Place = {
//       __typename: "Place",
//       id: idPlace,
//       name,
//       description,
//       address: "", // Remplacez par l'adresse appropriée si disponible
//       categories: [], // Remplacez par les catégories appropriées si disponibles
//       city: {
//         __typename: "City",
//         coordinates: { type: "Point", coordinates: [0, 0] }, // Remplacez par les coordonnées appropriées
//         id: "", // Remplacez par l'ID de la ville approprié
//         name: city,
//       },
//       coordinates: { type: "Point", coordinates: [0, 0] }, // Remplacez par les coordonnées appropriées
//       createdAt: new Date().toISOString(), // Remplacez par la date de création appropriée
//       owner: null, // Remplacez par le propriétaire approprié si disponible
//     };

//     setPlace(newPlace);
//   } catch (e) {
//     console.log(e);
//   }
// };
