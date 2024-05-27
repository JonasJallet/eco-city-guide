import React, { useState } from "react";
import { FiMaximize, FiMinimize } from "react-icons/fi";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      className="leaflet-bar leaflet-control mt-2"
      style={{
        marginLeft: "10px",
        borderRadius: "15px",
        borderColor: "white",
      }}
    >
      <button
        className="text-xl text-primary_color bg-tertiary_color hover:bg-primary_color hover:text-tertiary_color rounded-xl flex justify-center items-center"
        onClick={() => toggleFullscreen()}
        style={{ width: "38px", height: "38px", lineHeight: "30px" }}
      >
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </button>
    </div>
  );
};

export default FullscreenButton;
