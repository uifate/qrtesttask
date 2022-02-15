import React, { useRef } from "react";
import { observer } from "mobx-react-lite";

import "./map.css";
import { MapPointView } from ".";

import { MapContext } from "./MapContext";

function clamp(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

export const MapView = observer(({ style, res, mapStore }) => {
  const containerRef = useRef();
  const pointDragOriginOffset = useRef(null);

  function handleMouseMove(event) {
    if (event.buttons !== 1) return;
    if (mapStore.selected === -1) return;
    if (pointDragOriginOffset.current === null) return;

    const rect = containerRef.current.getBoundingClientRect();
    const { x: offsetX, y: offsetY } = pointDragOriginOffset.current;
    const relMouseX = event.clientX - rect.left + offsetX;
    const relMouseY = event.clientY - rect.top + offsetY;
    const x = clamp(relMouseX / rect.width * 100, 0, 100);
    const y = clamp(relMouseY / rect.height * 100, 0, 100);

    mapStore.changeSelectedPoint({ x, y });
  }

  function handleMouseDown() {
    pointDragOriginOffset.current = null;
  }

  function handlePointMouseDown(event) {
    event.stopPropagation();
    const { top: y, left: x } = event.target.getBoundingClientRect();
    pointDragOriginOffset.current = {
      x: x - event.clientX,
      y: y - event.clientY
    }
  }

  return (
    <MapContext.Provider value={{ mapStore }}>
      <div style={{ position: "relative", ...style }} onMouseMove={handleMouseMove} ref={containerRef} >
        <img
          src={res}
          style={{ width: "100%", height: "100%" }}
          onClick={() => mapStore.unselect() }
          draggable="false"
          onMouseDown={handleMouseDown}
        />
        {
          mapStore.points.map(
            point => <MapPointView point={point} key={point.id} onMouseDown={handlePointMouseDown} />
          )
        }
      </div>
    </MapContext.Provider>
  );
})