// AuthContext.js
import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { user: null };
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

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    bundleName: "",
    selectedCategory: null,
    listingTags: [], // Include tags in the initial state
    modificationCheckboxes: [],
  });

  // console.log("Auth context state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
