import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <App />
    <div class="example1">
      <h5> Flat 50% off on shirts, jewellery, bags etc..</h5>
    </div>
  </HashRouter>,
  document.getElementById("root")
);
