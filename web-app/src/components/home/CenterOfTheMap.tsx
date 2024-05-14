import { useEffect } from "react";
import { useMap } from "react-leaflet";

//TODO: Utilize this component
export const CenterOfTheMap = () => {
  const map = useMap();

  useEffect(() => {
    const center = map.getCenter();
    console.log("Center of the map:", center);
  }, [map]);

  return null;
};
