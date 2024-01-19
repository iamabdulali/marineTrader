import React, { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if(user){
//         dispatch({type:'LOGIN'})
//     }
// })

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("Auth context state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
