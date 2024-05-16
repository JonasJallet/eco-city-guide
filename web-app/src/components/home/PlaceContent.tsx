import React, { useContext } from "react";
import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { SideBarContentEnum } from "./sideBarContent.type";

export default function PlaceContent() {
  const { place } = useContext(PlaceContext) as PlaceContextType;
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  const handleCloseButton = () => {
    setSideBarEnum(SideBarContentEnum.NO_CONTENT);
  };

  return (
    <div className="flex flex-col h-screen w-80 pt-10 h-sreen">
      <button
        onClick={handleCloseButton}
        className="text-gray-400 hover:text-gray-600"
      >
        <FaTimes />
      </button>
      {place && (
        <>
          <div className="border-b border-gray-200">
            <p className="text-center text-2xl text-gray-600 font-bold font-sans cursor-default mt-4 mb-2">
              {place.name}
            </p>
            <div className="flex flex-wrap gap-2 rounded-2xl mb-2 px-5">
              {place.categories.map((category) => (
                <span
                  className="text-text_color text-xs bg-green-200 py-1 px-2 rounded-lg m-01"
                  key={category.id}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
          <div className="px-5 mt-5">
            <div className="flex items-center">
              <div className="text-lg text-green-500 mr-2">
                <FaMapMarkerAlt />
              </div>
              <p>
                {place.address}, {place.city.name}
              </p>
            </div>
            <p className="mt-5">{place.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
