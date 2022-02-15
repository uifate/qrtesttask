import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { MapPointDetails } from "./MapPointDetails";
import { MapContext } from "./MapContext";

export const MapPointView = observer(({ point }) => {
  const { mapStore } = useContext(MapContext);

  const style = {
    position: "absolute",
    top: `${point.y}%`,
    left: `${point.x}%`
  }

  // Не стал делать функцию mapStore.isPointSelected(point),
  // ибо похоже оно не может прошарить, что в функции
  // смотрится изменения point и оно не обновляет компонент
  // при изменении
  // Так что для обновления надо ставить что-то, что меняется
  // в сам компонент
  // Как ему (mobx-react-lite) объявить что что-то обновляется
  // не нашел
  const isSelected = mapStore.selectedPoint === point;

  return (
    <>
      <span
        style={style}
        className={classnames(
          "map-point", 
          {"map-point_selected": isSelected}
        )}
        onMouseDown={() => mapStore.setSelectedPoint(point)}
      >● {point.name}</span>
      { isSelected && <MapPointDetails point={point} style={style} /> }
    </>
  );
});