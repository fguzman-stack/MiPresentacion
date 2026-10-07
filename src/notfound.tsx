import React from "react";
import ReactDOM from "react-dom/client";
import NotFound from "./components/NotFound";
import "./index.css";
import "./portfolio.css";
import "./themes.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><NotFound /></React.StrictMode>,
);
