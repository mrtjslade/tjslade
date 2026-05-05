import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/professional.css";
import App from "./App";

try {
  const saved = window.localStorage.getItem("tjslade-theme-mode");
  document.documentElement.dataset.theme =
    saved === "space" ? "space" : "professional";
} catch (_) {
  document.documentElement.dataset.theme = "professional";
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
