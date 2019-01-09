import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/LandingPageView/LandingPage";
import ScheduleView from "./components/ScheduleView/ScheduleView";
import ProgressView from "./components/ProgressView/ProgressView";
import WorkoutsView from "./components/WorkoutsView/WorkoutsView";
import SettingsView from "./components/SettingsView.js";
import BillingView from "./components/BillingView.js";
import styled from "styled-components";

import "./App.css";

const url = `https://labs9-workout-tracker.herokuapp.com/api`;

const StyledApp = styled.div`
  text-align: center;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  border: 1px solid black;
  font-size: 62.5%;
  font-size: 1.2rem;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios
      .get(`${url}/user/info/1`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(err => {
        return `Message: ${err}`;
      });
  }

  render() {
    return (
      <StyledApp>
        <p>{this.state.user.name}</p>
        <p>{this.state.user.email}</p>
        <p>{this.state.user.phone}</p>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/schedule" component={ScheduleView} />
        <Route exact path="/progress" component={ProgressView} />
        <Route exact path="/workouts" component={WorkoutsView} />
        <Route exact path="/settings" component={SettingsView} />
        <Route exact path="/billing" component={BillingView} />
      </StyledApp>
    );
  }
}

export default App;
