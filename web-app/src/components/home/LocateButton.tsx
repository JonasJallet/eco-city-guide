import { useMapEvents } from "react-leaflet";

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
    <div className="leaflet-bar leaflet-control leaflet-control-custom">
      <button
        className="leaflet-bar-part leaflet-bar-part-single"
        onClick={() => map.locate()}
      >
        <i className="fa fa-map-marker" />
      </button>
    </div>
  );
};
