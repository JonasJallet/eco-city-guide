import { useMapEvents } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

export const LocateButton = () => {
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, 15);
    },
  });
  return (
    <div
      className="leaflet-bar leaflet-control mt-24"
      style={{
        marginLeft: "10px",
        borderRadius: "15px",
        borderColor: "white",
      }}
    >
      <button
        className="text-xl text-primary_color bg-tertiary_color transition-all duration-300 hover:bg-primary_color hover:text-tertiary_color rounded-xl flex justify-center items-center"
        onClick={() => map.locate()}
        style={{
          width: "38px",
          height: "38px",
          lineHeight: "30px",
        }}
      >
        <FaMapMarkerAlt />
      </button>
    </div>
  );
};
