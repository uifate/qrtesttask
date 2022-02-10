import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Login } from "./Login";
import { MapView } from "./Map";

import "normalize.css";
import "./app.css";

import mapRes from "../assets/map.svg";

export const App = observer(({ app }) => {
  useEffect(() => {
    app.load();
  }, []);

  return (
    <>
      { !app.userStore.loggedIn && <Login user={app.userStore} /> }
      { app.userStore.loggedIn && <>
        <button onClick={() => app.mapStore.newPoint()}>New point</button>
        <button onClick={() => app.mapStore.resetPoints()}>Reset points</button>
        <button onClick={() => app.userStore.logout()}>Logout</button>
        <MapView style={{width: "1000px", height: "1000px"}} res={mapRes} map={app.mapStore} />
      </> }
    </>
  );
});