import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";

// ReactStrap için bootstrap ve alertifyjs için gerekli importlar'ı yaptık

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);

