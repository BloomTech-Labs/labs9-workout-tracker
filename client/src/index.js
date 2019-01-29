import React, { useReducer, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase";

export const Store = createContext({ state: {}, dispatch: () => {} });

const initialState = {
  category: [],
  email: "",
  id: null,
  name: "",
  phone: "",
  premium: null,
  recieves_email: null,
  recieves_text: null,
  editWorkout: null,
  scheduleWorkouts: [],
  uid: "",
  workouts: [],
  editMetric: null,
  showMetricForm: false,
  selectedCategory: "default",
  selectedWorkoutCategory: "all",
  selectedDate: new Date(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_MODEL":
      return { ...state, ...action.payload };
    case "UPDATE_METRICS":
      return { ...state, metrics: [...action.payload] };
    case "UPDATE_SCHEDULE_WORKOUTS":
      return { ...state, scheduleWorkouts: [...action.payload] };
    case "EDIT_WORKOUT":
      return { ...state, editWorkout: { ...action.payload } };
    case "RESET_EDIT_WORKOUT":
      return { ...state, editWorkout: null };
    case "UPDATE_WORKOUTS":
      return { ...state, workouts: [...action.payload] };
    case "EDIT_METRIC":
      return { ...state, editMetric: { ...action.payload } };
    case "RESET_EDIT_METRIC":
      return { ...state, editMetric: null };
    case "SHOW_METRIC_FORM":
      return { ...state, showMetricForm: !state.showMetricForm };
    case "UPDATE_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "UPDATE_SELECTED_WORKOUTS_CATEGORY":
      return { ...state, selectedWorkoutCategory: action.payload };
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
};

const AppContainer = () => {
  useEffect(() => {
    var config = {
      apiKey: "AIzaSyAQRB_UBjCXzDmxluLuDiM-VUjEoi9HjnQ",
      authDomain: "fitmetrix-57cce.firebaseapp.com",
      databaseURL: "https://fitmetrix-57cce.firebaseio.com",
      projectId: "fitmetrix-57cce",
      storageBucket: "fitmetrix-57cce.appspot.com",
      messagingSenderId: "771224902694"
    };
    firebase.initializeApp(config);
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <Store.Provider value={{ state, dispatch }}>
        <App />
      </Store.Provider>
    </Router>
  );
};

ReactDOM.render(<AppContainer />, document.getElementById("root"));
