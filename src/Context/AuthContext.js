// AuthContext.js
import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_CATEGORY_BUILD_AD":
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
    case "UPDATE_CHECKBOXES":
      return { ...state, modificationCheckboxes: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
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
    isAuthenticated: false,
  });

  // console.log("Auth context state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
