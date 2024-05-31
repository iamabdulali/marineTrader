import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const SERVER_BASE_URL = "https://marine.takhleeqsoft.com/api";
export const subscriptions = ["Dealer Plus", "Service Plus"];
export const categoriesList = [
  "",
  "Jetski",
  "Boat Home",
  "Commercial",
  "Yacht",
  "Small Craft",
  "Fishing",
  "RIB",
  "Non Motor",
];

export const smallBoats = ["jetski", "non-motor", "rib", "small-craft"];
export const bigBoats = [
  "fishing",
  "boat-home",
  "sail-boat",
  "yacht",
  "commercial",
];

export const advertPackages = ["Basic", "Standard", "Premium", "Featured"];

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
