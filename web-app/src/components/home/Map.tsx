import L, { LatLng } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  LayersControl,
} from "react-leaflet";
import PlaceContext, { PlaceContextType } from "@/contexts/PlaceContext";
import SurroundingPlacesContext, {
  SurroundingPlacesContextType,
} from "@/contexts/SurroundingPlacesContext";
import { CenterOfTheMap } from "./CenterOfTheMap";
import { LocateButton } from "./LocateButton";
import { SideBarContentEnum } from "./sideBarContent.type";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import FullscreenButton from "./FullScreenButton";

export default function Map() {
  const { place } = useContext(PlaceContext) as PlaceContextType;
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;
  const { surroundingPlaces, setSurroundingPlaces } = useContext(
    SurroundingPlacesContext,
  ) as SurroundingPlacesContextType;
  const [mapRenderingCenterPoint, setMapRenderingCenterPoint] = useState([
    47.068703, 2.747125,
  ]);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (place !== undefined) {
      const [longitude, latitude] = place.coordinates?.coordinates;
      setMapRenderingCenterPoint([longitude, latitude]);
      setSurroundingPlaces([place]);
      setZoom(15);
    }
  }, [place]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const crd = pos.coords;
              if (!place) {
                setMapRenderingCenterPoint([crd.latitude, crd.longitude]);
                setSurroundingPlaces([]);
                setZoom(13);
              }
            },
            (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
          );
        } else if (result.state === "denied") {
          console.log("Geolocation is denied by the user.");
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [place]);

  const handleMarkerClick = () => {
    setSideBarEnum(SideBarContentEnum.PLACE);
  };

  const layers = [
    {
      name: "Par défaut",
      url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
    },
    {
      name: "Satellite",
      url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png",
    },
  ];

  return (
    <>
      <div className="flex h-full w-full z-10">
        <MapContainer
          key={mapRenderingCenterPoint.toString()}
          center={[mapRenderingCenterPoint[0], mapRenderingCenterPoint[1]]}
          zoom={zoom}
          touchZoom={false}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <LayersControl position="bottomleft">
            {layers.map((layer, index) => {
              return (
                <LayersControl.BaseLayer
                  key={index}
                  checked={index === 0 ? true : false}
                  name={layer.name}
                >
                  <TileLayer url={layer.url} />
                </LayersControl.BaseLayer>
              );
            })}
          </LayersControl>
          <LocateButton />
          <FullscreenButton />
          <CenterOfTheMap />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          />
          {surroundingPlaces.length > 0 &&
            surroundingPlaces.map((place, index) => (
              <Marker
                key={index}
                position={[
                  place.coordinates.coordinates[0] as number,
                  place.coordinates.coordinates[1] as number,
                ]}
                eventHandlers={{
                  click: () => handleMarkerClick(),
                }}
                icon={L.icon({
                  iconSize: [40, 40],
                  shadowSize: [50, 64],
                  iconUrl: "/images/marker.png",
                })}
              >
                {/* <Popup>
                  Ceci est un nom
                  <br /> NOTE
                </Popup> */}
              </Marker>
            ))}
        </MapContainer>
      </div>
    </>
  );
}
