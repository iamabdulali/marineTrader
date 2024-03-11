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
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    bundleName: "",
    user: null, // Updated user initialization
    selectedCategory: null,
    listingTags: [],
    modificationCheckboxes: [],
    featuresCheckboxes: [],
    convenienceCheckboxes: [],
    accessoriesCheckboxes: [],
    isAuthenticated: false,
    selectedPackage: null, // Adding selectedPackage state
    selectedCategory: null,
  });

  // console.log("Auth context state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
