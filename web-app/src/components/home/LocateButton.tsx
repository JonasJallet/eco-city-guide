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
      className="leaflet-bar leaflet-control mt-24"
      style={{
        marginLeft: "10px",
        borderRadius: "15px",
        borderColor: "white",
      }}
    >
      <button
        className="text-2xl text-white bg-green-500 hover:bg-white hover:text-green-500 rounded-xl flex justify-center items-center"
        onClick={() => map.locate()}
        style={{ width: "40px", height: "40px", lineHeight: "30px" }}
      >
        <FaMapMarkerAlt />
      </button>
    </div>
  );
};
