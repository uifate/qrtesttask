import React, { useRef } from "react";
import { observer } from "mobx-react-lite";

import "./map.css";
import { MapPointView } from ".";

export const MapView = observer(({ style, res, map }) => {
  const containerRef = useRef();

  function handleMouseMove(event) {
    if (event.buttons !== 1) return;
    if (map.selected === -1) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relMouseX = event.clientX - rect.left;
    const relMouseY = event.clientY - rect.top;
    const x = relMouseX / rect.width * 100;
    const y = relMouseY / rect.height * 100;

    map.selectedPoint.change({ x, y });
  }

  return (
    <div style={{ position: "relative", ...style }} onMouseMove={handleMouseMove} ref={containerRef} >
      <img
        src={res}
        style={{ width: "100%", height: "100%" }}
        onClick={() => map.setSelected(-1) }
        draggable="false"
      />
      {
        map.points.map(
          point => <MapPointView point={point} key={point.id} />
        )
      }
    </div>
  );
})