import { autorun } from "mobx";
import React, { useEffect, useState } from "react";

function useDisplayValue(get, set, transform) {
  const [displayValue, setDisplayValue] = useState(get());

  useEffect(() => {
    autorun(() => setDisplayValue(get()));
  }, []);

  return [displayValue, function(value) {
    setDisplayValue(value);
    const transformed = transform(value);
    if (!isNaN(transformed)) set(transformed);
  }];
}

export function MapPointDetails({ point, style }) {
  const [displayX, setX] = useDisplayValue(
    () => point.x, 
    x => point.change({ x }),
    parseFloat
  );
  const [displayY, setY] = useDisplayValue(
    () => point.y, 
    y => point.change({ y }),
    parseFloat
  );
  const [displayAmount, setAmount] = useDisplayValue(
    () => point.amount, 
    amount => point.change({ amount }),
    parseInt
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