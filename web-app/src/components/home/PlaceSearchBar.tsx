import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import SurroundingPlacesContext, {
  SurroundingPlacesContextType,
} from "@/contexts/SurroundingPlacesContext";
import { Place } from "@/gql/graphql";
import { GET_PLACES } from "@/gql/queries";
import { getSurroundingPlacesAroundPoint } from "@/utils/getSurroundingPlacesAroundPoint";
import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface Props {
  city?: string;
  category?: string;
}

export default function PlaceSearchBar({ city, category }: Props) {
  const [searchPlace, setSearchPlace] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const { place, setPlace } = useContext(PlaceContext) as PlaceContextType;
  const { surroundingPlaces, setSurroundingPlaces } = useContext(
    SurroundingPlacesContext,
  ) as SurroundingPlacesContextType;
  const { data: placesData } = useQuery(GET_PLACES, {
    variables: { city },
  });

  const handleSearchPlacesInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setSearchPlace(event?.target.value);
    if (searchPlace.length > 2) {
      setSearchResults(
        placesData?.places
          .filter(
            (place: Place) =>
              place.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
              place.address
                .toLowerCase()
                .includes(event.target.value.toLowerCase()),
          )
          .slice(0, 5),
      );
    }
  };

  const handlePlaceSearchButton = (place: Place) => {
    setSearchPlace(place.name);
    setSearchResults([]);
    setPlace(place);

    // Test to display surrounding places
    // setSurroundingPlaces(
    //   getSurroundingPlacesAroundPoint(
    //     placesData.places,
    //     place.coordinates.coordinates,
    //     6,
    //   ),
    // );
  };

  return (
    <>
      <div className="w-80 relative">
        <input
          className={`w-full bg-white-200 px-4 py-3 cursor-pointer ${
            searchResults?.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
          } border border-border_color focus:outline-none`}
          type="text"
          name="search"
          id="search"
          placeholder="Chercher un lieu..."
          value={searchPlace}
          onChange={(event) => {
            handleSearchPlacesInput(event);
          }}
          onBlur={() => {
            setTimeout(() => {
              setSearchResults([]);
            }, 200);
          }}
        />
        <HiOutlineSearch className=" w-6 h-6 absolute right-3 top-3 text-gray-500" />
        {searchResults?.length > 0 && (
          <div className="flex flex-col absolute z-20 top-10 w-80 rounded-b-3xl border border-border_color bg-white">
            {searchResults.map((place, index) => (
              <button
                key={index}
                className={`flex px-4 py-2 w-full h-full list-none overflow-hidden truncate  white-space-nowrap hover:bg-green-50b ${
                  index == 5 ?? "hover:rounded-b-3xl"
                }`}
                onClick={() => {
                  handlePlaceSearchButton(place);
                }}
              >
                <p className="text-bold mr-1">{place.name}</p>
                <p className="truncate text-ellipsis text-gray-500">
                  {place.address}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
