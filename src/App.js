import React, { useState, useEffect } from "react";
import ImageUpload from "./file-selector";

function App() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: windowDimensions.width,
        height: windowDimensions.height,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <ImageUpload />
    </div>
  );
}

export default App;
