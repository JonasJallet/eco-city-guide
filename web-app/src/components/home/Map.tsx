import L from "leaflet";
import React from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  LayersControl,
} from "react-leaflet";

export default function Map() {
  return (
    <div className="flex h-full w-full z-10">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ height: "100vh", width: "100vw" }}
      >
        <LayersControl />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        <Marker
          position={[51.505, -0.09]}
          icon={L.divIcon({
            iconSize: [5, 5],
            iconAnchor: [5, 5],
            html: "😁",
          })}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
