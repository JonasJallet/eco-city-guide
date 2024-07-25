import { Category } from "@/gql/generate/graphql";
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useMap } from "react-leaflet";

interface Props {
  setCenterOfTheMap: (center: LatLng) => void;
  setZoomLevel: (zoomLevel: number) => void;
  category?: Category;
  isCategorySelected: boolean;
  setIsCategorySelected: (isCategorySelected: boolean) => void;
}

export const SearchCategoryOnMap = ({
  setCenterOfTheMap,
  setZoomLevel,
  category,
  isCategorySelected,
  setIsCategorySelected,
}: Props) => {
  const [isMoved, setIsMoved] = useState(false);
  const map = useMap();

  if (category !== undefined) {
    map.on("move", () => {
      setIsMoved(true);
    });
  }

  const getCenterOfTheMap = () => {
    setIsMoved(false);
    const center = map.getCenter();
    const zoomLevel = map.getZoom();
    setCenterOfTheMap(center);
    setZoomLevel(zoomLevel);
  };

  useEffect(() => {
    if (isCategorySelected) {
      getCenterOfTheMap();
      setIsCategorySelected(false);
    }
  }, [isCategorySelected]);

  return (
    isMoved &&
    category && (
      <div
        className="leaflet-bar leaflet-control animate-fade mt-2"
        style={{
          marginLeft: "10px",
          borderRadius: "15px",
          borderColor: "white",
        }}
      >
        <button
          onClick={getCenterOfTheMap}
          className=" text-primary_color bg-tertiary_color transition-all duration-300 hover:bg-primary_color hover:text-tertiary_color rounded-xl flex justify-center items-center"
          style={{ width: "170px", height: "38px", lineHeight: "30px" }}
        >
          <HiOutlineSearch size={20} />
          <p className="ml-2">Rechercher à nouveau</p>
        </button>
      </div>
    )
  );
};
