import React, { useRef } from "react";
import { observer } from "mobx-react-lite";

import "./map.css";
import { MapPointView } from ".";

import { MapContext } from "./MapContext";

export const MapView = observer(({ style, res, mapStore }) => {
  const containerRef = useRef();

  function handleMouseMove(event) {
    if (event.buttons !== 1) return;
    if (mapStore.selected === -1) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relMouseX = event.clientX - rect.left;
    const relMouseY = event.clientY - rect.top;
    const x = relMouseX / rect.width * 100;
    const y = relMouseY / rect.height * 100;

    mapStore.selectedPoint.change({ x, y });
  }

  return (
    <MapContext.Provider value={{ mapStore }}>
      <div style={{ position: "relative", ...style }} onMouseMove={handleMouseMove} ref={containerRef} >
        <img
          src={res}
          style={{ width: "100%", height: "100%" }}
          onClick={() => mapStore.unselect() }
          draggable="false"
        />
        {
          mapStore.points.map(
            point => <MapPointView point={point} key={point.id} />
          )
        }
      </div>
    </MapContext.Provider>
  );
})