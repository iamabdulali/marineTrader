// AuthContext.js
import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "ADD_TAG":
      return { ...state, listingTags: [...state.listingTags, action.payload] };
    case "REMOVE_TAG":
      return {
        ...state,
        listingTags: state.listingTags.filter((tag) => tag !== action.payload),
      };
    case "CLEAR_TAGS":
      return { ...state, listingTags: [] };
    case "UPDATE_MODIFICATIONS":
      return { ...state, modificationCheckboxes: action.payload };
    case "UPDATE_FEATURES":
      return { ...state, featuresCheckboxes: action.payload };
    case "UPDATE_ACCESSORIES":
      return { ...state, accessoriesCheckboxes: action.payload };
    case "UPDATE_CONVENIENCE":
      return { ...state, convenienceCheckboxes: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "SELECT_PACKAGE":
      return { ...state, selectedPackage: action.payload };
    case "REFRESH_STATE":
      return { ...state, refresh: action.payload };
    case "USER_DETAILS":
      return { ...state, userLocationDetails: action.payload };
    case "MAKES":
      return { ...state, makes: action.payload };
    case "MODALS":
      return { ...state, modals: action.payload };
    case "CONDITIONS":
      return { ...state, conditions: action.payload };
    case "TYPES":
      return { ...state, types: action.payload };
    case "CATEGORIES":
      return { ...state, categories: action.payload };
    case "CURRENCY":
      return { ...state, currency: action.payload };
    case "TAXES":
      return { ...state, taxes: action.payload };
    case "FCM_TOKEN":
      return { ...state, fcmToken: action.payload };
    case "SELECTED_BUNDLE":
      return { ...state, selectedBundle: action.payload };
    case "CURRENCY_RATES":
      return { ...state, currencyRates: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    selectedBundle: null,
    user: null, // Updated user initialization
    selectedCategory: null,
    listingTags: [],
    modificationCheckboxes: [
      "Standard",
      "ECU Upgrade",
      "Propellor Upgrade",
      "Supercharger Upgrade",
      "Remapped",
      "Engine Modifications",
      "Exhaust Upgrade",
    ],
    featuresCheckboxes: [
      "Breaking System",
      "Audio System",
      "Bilge Pump",
      "USB Port",
      "Alarm",
      "Immobiliser",
      "Storage Compartment",
      "Rear View Mirror",
      "Tracker",
    ],
    convenienceCheckboxes: [
      "Digital Dashboard",
      "Fuel Level Indicator",
      "Depth Sensor",
      "Engine Temp Display",
      "Hours Meter",
      "Oil Gauge",
      "Rev Counter",
      "Speedometer",
      "Time",
    ],
    accessoriesCheckboxes: [
      "Fishing Box",
      "Additional Battery",
      "Fishing Rod Holder",
      "Cover",
      "Rear Step",
    ],
    isAuthenticated: false,
    selectedPackage: null, // Adding selectedPackage state
    selectedCategory: null,
    refresh: false,
    userLocationDetails: [],
    makes: [],
    modals: [],
    conditions: [],
    types: [],
    categories: [],
    currency: [],
    taxes: [],
    fcmToken: "",
    currencyRates: [],
  });

  // console.log("Auth context state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
