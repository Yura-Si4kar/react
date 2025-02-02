import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";
import App from "./App/App";
import { Context } from "./context";
import AppStore from "./store/AppStore";
import AlbumsStore from "./store/AlbumsStore";
import PlayerStore from "./store/PlayerStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      app: new AppStore(),
      gallery: new AlbumsStore(),
      player: new PlayerStore(),
    }}
  >
    <App />
  </Context.Provider>,
);
