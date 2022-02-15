import React, { useContext } from "react";
import { isInt, isFloat, toInt, toFloat } from "validator";

import { useDisplayValue } from "../../hooks/useDisplayValue";
import { MapContext } from "./MapContext";

export function MapPointDetails({ point, style }) {
  const { mapStore } = useContext(MapContext);

  const [displayX, setX] = useDisplayValue(
    () => point.x, 
    x => mapStore.changeSelectedPoint({ x }),
    v => isFloat(v) || v === "",
    toFloat
  );
  const [displayY, setY] = useDisplayValue(
    () => point.y, 
    y => mapStore.changeSelectedPoint({ y }),
    v => isFloat(v) || v === "",
    toFloat
  );
  const [displayAmount, setAmount] = useDisplayValue(
    () => point.amount, 
    amount => mapStore.changeSelectedPoint({ amount }),
    v => isInt(v) || v === "",
    toInt
  );

  return (
    <div style={style} className="map-point__details">
      <input type="text" value={displayX} onChange={(e) => setX(e.target.value)} />
      <input type="text" value={displayY} onChange={(e) => setY(e.target.value)} />
      <input type="text" value={point.name} onChange={(e) => mapStore.changeSelectedPoint({ name: e.target.value })} />
      <input type="text" value={displayAmount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={() => mapStore.removeSelectedPoint()}>Remove</button>
    </div>
  );
};