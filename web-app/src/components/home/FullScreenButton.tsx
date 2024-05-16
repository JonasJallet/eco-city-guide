import React, { useState } from "react";
import { FiMaximize, FiMinimize } from "react-icons/fi";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div className="fullscreen-button">
      <button onClick={toggleFullscreen}>
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </button>
    </div>
  );
};

export default FullscreenButton;
