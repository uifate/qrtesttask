import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";

import { AppStore } from "./stores/AppStore";

const app = AppStore.create();

ReactDOM.render(
  <React.StrictMode>
    <App app={app} />
  </React.StrictMode>,
  document.getElementById("root")
);