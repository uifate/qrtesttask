import React from "react";
import { isInt, isFloat, toInt, toFloat } from "validator";

import { useDisplayValue } from "../../hooks/useDisplayValue";

export function MapPointDetails({ point, style }) {
  const [displayX, setX] = useDisplayValue(
    () => point.x, 
    x => point.change({ x }),
    v => isFloat(v) || v === "",
    toFloat
  );
  const [displayY, setY] = useDisplayValue(
    () => point.y, 
    y => point.change({ y }),
    v => isFloat(v) || v === "",
    toFloat
  );
  const [displayAmount, setAmount] = useDisplayValue(
    () => point.amount, 
    amount => point.change({ amount }),
    v => isInt(v) || v === "",
    toInt
  );

  return (
    <div style={style} className="map-point__details">
      <input type="text" value={displayX} onChange={(e) => setX(e.target.value)} />
      <input type="text" value={displayY} onChange={(e) => setY(e.target.value)} />
      <input type="text" value={point.name} onChange={(e) => point.change({ name: e.target.value })} />
      <input type="text" value={displayAmount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={() => point.remove()}>Remove</button>
    </div>
  );
};