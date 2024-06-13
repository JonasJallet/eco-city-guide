import React, { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { SideBarContentEnum } from "./sideBarContent.type";
import { MdClose, MdLocationPin, MdStar, MdStarBorder } from "react-icons/md";
import { ADD_FAVORITE_PLACE, REMOVE_FAVORITE_PLACE } from "@/gql/mutations";
import { GET_PROFILE, IS_IN_FAVORITES } from "@/gql/queries";
import { useRouter } from "next/router";

export default function PlaceContent() {
  const { place } = useContext(PlaceContext) as PlaceContextType;
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  const { data: userData } = useQuery(GET_PROFILE);
  const { data: favoriteData } = useQuery(IS_IN_FAVORITES, {
    variables: { placeId: place?.id },
    skip: !place,
  });
  const router = useRouter();

  const [addFavoritePlace] = useMutation(ADD_FAVORITE_PLACE, {
    refetchQueries: [
      { query: IS_IN_FAVORITES, variables: { placeId: place?.id } },
    ],
  });

  const [removeFavoritePlace] = useMutation(REMOVE_FAVORITE_PLACE, {
    refetchQueries: [
      { query: IS_IN_FAVORITES, variables: { placeId: place?.id } },
    ],
  });

  const handleFavoriteToggle = () => {
    if (!userData) {
      return router.push("/login/sign-in");
    }

    if (favoriteData?.isInFavorites) {
      removeFavoritePlace({ variables: { placeId: place?.id } });
    } else {
      addFavoritePlace({ variables: { placeId: place?.id } });
    }
  };

  const handleCloseButton = () => {
    setSideBarEnum(SideBarContentEnum.NO_CONTENT);
  };

  return (
    <div className="flex flex-col h-screen w-80 h-sreen">
      <button
        onClick={handleCloseButton}
        className="self-start text-2xl text-2xl text-gray-500 rounded-xl hover:bg-gray-100 hover:text-tertiary_color p-2 m-1"
      >
        <MdClose />
      </button>
      {place && (
        <>
          <div className="border-b border-gray-200">
            <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
              {place.name}
            </p>
          </div>
          <div className="px-4 mt-5">
            <div className="flex items-center">
              <div className="text-lg text-tertiary_color mr-2">
                <MdLocationPin className="w-6 h-6" />
              </div>
              <p>
                {place.address}, {place.city.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 rounded-2xl mb-2 mt-4 px-4">
              {place.categories.map((category, index) => (
                <span
                  key={index}
                  className="text-white text-xs bg-tertiary_color py-1 px-2 rounded-lg m-01 pointer-events-none"
                  data-index={index} // Adding data-index attribute with index
                >
                  {category.name}
                </span>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleFavoriteToggle}
                className="p-1 border border-yellow-500 text-yellow-500 rounded-xl"
              >
                {favoriteData?.isInFavorites ? (
                  <MdStar className="w-6 h-6" />
                ) : (
                  <MdStarBorder className="w-6 h-6" />
                )}
              </button>
            </div>
            <p className="border-b border-tertiary_color inline-block pl-1 pr-3">
              Description
            </p>
            <p className="mt-1">{place.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
