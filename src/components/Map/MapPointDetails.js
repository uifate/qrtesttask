import React, { useEffect, useState } from "react";

function notNaN(number) {
  if (isNaN(number)) return;
  return number;
}

export function MapPointDetails({ point, style }) {
  const [x, setX] = useState(point.x);
  const [y, setY] = useState(point.y);
  const [name, setName] = useState(point.name);
  const [amount, setAmount] = useState(point.amount);

  useEffect(() => {
    point.change({
      x: notNaN(parseFloat(x)),
      y: notNaN(parseFloat(y)),
      name: name,
      amount: notNaN(parseInt(amount))
    });
  }, [x, y, name, amount]);

  return (
    <div style={style} className="map-point__details">
      <input type="text" value={x} onChange={(e) => setX(e.target.value)} />
      <input type="text" value={y} onChange={(e) => setY(e.target.value)} />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={() => point.remove()}>Remove</button>
    </div>
  );
};