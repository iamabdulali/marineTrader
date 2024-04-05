import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const SERVER_BASE_URL = "https://marine.takhleeqsoft.com/api";
// export const packages = ["Standard", "Premium", "Featured"];
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
