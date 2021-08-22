import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import dotenv from "dotenv";
import DevTools from "mobx-react-devtools";

import "./styles/base.scss";
console.log(process.env.NODE_ENV);
dotenv.config();
ReactDOM.render(
  <>
    <DevTools />
    <App />
  </>,
  document.getElementById("root")
);
