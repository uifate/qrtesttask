import React, { useContext, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { MapPointDetails } from "./MapPointDetails";

export const MapPointView = observer(({ point }) => {
  const style = {
    position: "absolute",
    top: `${point.y}%`,
    left: `${point.x}%`
  }

  return (
    <>
      <span
        style={style}
        className={classnames(
          "map-point", 
          {"map-point_selected": point.isSelected}
        )}
        onMouseDown={() => point.select()}
      >● {point.name}</span>
      { point.isSelected && <MapPointDetails point={point} style={style} /> }
    </>
  );
});