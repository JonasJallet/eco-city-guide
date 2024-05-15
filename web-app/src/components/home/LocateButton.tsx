import { useMapEvents } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

export const LocateButton = () => {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      map.flyTo(e.latlng, 15);
    },
  });
  return (
    <div
      className="leaflet-bar leaflet-control leaflet-control-custom mt-24"
      style={{ marginLeft: "10px" }}
    >
      <button
        className="text-lg bg-white hover:bg-gray-100 rounded-sm flex justify-center items-center"
        onClick={() => map.locate()}
        style={{ width: "30px", height: "30px", lineHeight: "30px" }}
      >
        <FaMapMarkerAlt />
      </button>
    </div>
  );
};
