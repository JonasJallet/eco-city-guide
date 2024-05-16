import React, { useContext } from "react";
import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { SideBarContentEnum } from "./sideBarContent.type";
import { MdClose, MdLocationPin } from "react-icons/md";

export default function PlaceContent() {
  const { place } = useContext(PlaceContext) as PlaceContextType;
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  const handleCloseButton = () => {
    setSideBarEnum(SideBarContentEnum.NO_CONTENT);
  };

  return (
    <div className="flex flex-col h-screen w-80 h-sreen">
      <button
        onClick={handleCloseButton}
        className="absolute text-2xl text-gray-500 rounded-xl hover:bg-gray-100 hover:text-green-500 p-2 m-1"
      >
        <MdClose />
      </button>
      {place && (
        <>
          <div className="border-b border-gray-200 pt-10">
            <p className="text-center text-2xl text-gray-600 font-bold font-sans cursor-default mb-2">
              {place.name}
            </p>
            <div className="flex flex-wrap gap-2 rounded-2xl mb-2 px-4">
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
          <div className="px-4 mt-5">
            <div className="flex items-center">
              <div className="text-lg text-green-500 mr-2">
                <MdLocationPin />
              </div>
              <p>
                {place.address}, {place.city.name}
              </p>
            </div>
            <div className="mt-6">
              <p className="border-b border-green-500 inline-block pl-1 pr-3">
                Description
              </p>
              <p className="mt-1">{place.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
