import React, { useContext, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { MapPointDetails } from "./MapPointDetails";

export const MapPointView = observer(({ point }) => {
  function handleClick() {
    point.select();
  }

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
        onClick={handleClick}
      >● {point.name}</span>
      { point.isSelected && <MapPointDetails point={point} style={style} /> }
    </>
  );
});