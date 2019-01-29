import React, { useReducer, useEffect, createContext } from "react";
import userData from "./mockData";

export const AppState = createContext({ state: {}, dispatch: () => {} });

export const initialState = {
  user: userData
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "userModel":
      return { ...state, user: { ...action.payload } };
    case "CONTEXT_TEST":
      console.log("hi from reducer");
      return { ...state };
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
};

export const [state, dispatch] = useReducer(reducer, initialState);
