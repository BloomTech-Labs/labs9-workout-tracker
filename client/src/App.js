import React, { useReducer, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
// import axios from "axios";
import LandingPage from "./components/LandingPageView/LandingPage";
import ScheduleView from "./components/ScheduleView/ScheduleView";
import ProgressView from "./components/ProgressView/ProgressView";
import WorkoutsView from "./components/WorkoutsView/WorkoutsView";
import SettingsView from "./components/SettingsView/SettingsView";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./StyleTheme";
import firebase from "firebase";
import userData from "./mockData";
const App = props => {
  const initialState = {
    user: userData
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "userModel":
        return { ...state, user: action.payload };
      default:
        // A reducer must always return a valid state.
        // Alternatively you can throw an error if an invalid action is dispatched.
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // Similar to componentDidMount and componentDidUpdate:
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
    // const token = window.localStorage.getItem("login_token");
    // if (token !== undefined) {
    //   axios
    //     .post(
    //       "https://fitmetrix.herokuapp.com/auth/login",
    //       {},
    //       { headers: { Authorization: token } }
    //     )
    //     .then(res => {
    //       console.log(res.data);
    //       dispatch({ type: "userModel", payload: res.data });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Route path="/" render={props => <Navigation {...props} />} />
        <StyledApp>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} dispatch={dispatch} />}
          />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} dispatch={dispatch} />}
          />
          <Route
            exact
            path="/schedule"
            render={props => (
              <ScheduleView
                {...props}
                workouts={state.user.workouts}
                scheduleWorkouts={state.user.scheduleWorkouts}
                user={state.user}
              />
            )}
          />
          <Route
            exact
            path="/progress"
            render={props => <ProgressView {...props} user={state.user} />}
          />
          <Route
            exact
            path="/workouts"
            render={props => (
              <WorkoutsView {...props} workouts={state.user.workouts} />
            )}
          />
          <Route
            exact
            path="/settings"
            render={props => <SettingsView {...props} user={state.user} />}
          />
        </StyledApp>
      </div>
    </ThemeProvider>
  );
};
export default App;
const StyledApp = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  font-size: 62.5%;
  font-size: 1.2rem;
  height: 100vh;
  position: relative;
  background-color: transparent;
  padding: 0 30px;
  font-family: ${props => props.theme.opensans};
`;
