import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import { Place } from "@/gql/generate/graphql";
import { GET_PLACES } from "@/gql/requests/queries";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SideBarContentEnum } from "./sideBarContent.type";
import SideBarContent from "./SideBarContent";

interface Props {
  category?: string;
}

export default function PlaceSearchBar({ category }: Props) {
  const [searchPlace, setSearchPlace] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const { setPlace } = useContext(PlaceContext) as PlaceContextType;
  const { sideBarEnum, setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;
  const { data: placesData } = useQuery(GET_PLACES, {
    variables: { category },
  });

  console.log(placesData);

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
    setSideBarEnum(SideBarContentEnum.PLACE);
  };

  useEffect(() => {
    if (category) {
      setSearchPlace(category);
    }
  }, [category]);

  useEffect(() => {
    if (sideBarEnum === SideBarContentEnum.NO_CONTENT) {
      setSearchPlace("");
    }
  }, [sideBarEnum]);

  return (
    <>
      <div className="w-full relative">
        <input
          className={`w-full bg-white-200 px-4 py-3 cursor-text ${
            searchResults?.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
          } border border-tertiary_color hover:border-input_hover_bg hover:bg-input_hover_bg transition-all duration- outline-none focus:outline-none`}
          type="text"
          name="search"
          id="search"
          placeholder={"Rechercher lieu..."}
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
        <HiOutlineSearch className=" w-6 h-6 absolute right-3 top-3 text-tertiary_color" />
        {searchResults?.length > 0 && (
          <div className="flex flex-col absolute z-20 top-10 w-80 rounded-b-3xl border border-tertiary_color bg-white animate-fade">
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
