import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

const MapResizeHandler = () => {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (map) {
        map.invalidateSize();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  useEffect(() => {
    const handleResize = () => {
      if (map && containerRef.current) {
        map.invalidateSize();
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [map]);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
};

export default MapResizeHandler;
