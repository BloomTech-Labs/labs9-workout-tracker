import React, { Component } from "react";
import { Route } from "react-router-dom";
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

// const url = `https://labs9-workout-tracker.herokuapp.com/api`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userData
    };
  }

  componentDidMount() {
    var config = {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: "fitmetrix-57cce.firebaseapp.com",
      databaseURL: "https://fitmetrix-57cce.firebaseio.com",
      projectId: "fitmetrix-57cce",
      storageBucket: "fitmetrix-57cce.appspot.com",
      messagingSenderId: "771224902694"
    };

    firebase.initializeApp(config);

    // axios
    //   .get(`${url}/user/info/1`)
    //   .then(response => {
    //     this.setState({ user: response.data });
    //   })
    //   .catch(err => {
    //     return `Message: ${err}`;
    //   });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Route path="/" render={props => <Navigation {...props} />} />
          <StyledApp>
            <Route exact path="/" component={LandingPage} />
            <Route
              exact
              path="/schedule"
              render={props => (
                <ScheduleView
                  {...props}
                  workouts={this.state.user.workouts}
                  scheduleWorkouts={this.state.user.scheduleWorkouts}
                />
              )}
            />
            <Route
              exact
              path="/progress"
              render={props => (
                <ProgressView {...props} user={this.state.user} />
              )}
            />

            <Route
              exact
              path="/workouts"
              render={props => (
                <WorkoutsView {...props} workouts={this.state.user.workouts} />
              )}
            />
            <Route
              exact
              path="/settings"
              render={props => (
                <SettingsView {...props} workouts={this.state.user.workouts} />
              )}
            />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} />}
            />
          </StyledApp>
        </div>
      </ThemeProvider>
    );
  }
}

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
