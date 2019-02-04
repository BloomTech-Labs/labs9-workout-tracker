import React, { useContext } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPageView/LandingPage";
import ScheduleView from "./components/ScheduleView";
import ProgressView from "./components/ProgressView";
import WorkoutsView from "./components/WorkoutsView";
import SettingsView from "./components/SettingsView/SettingsView";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./StyleTheme";
import { Store } from "./index";
import MainSettingsView from "./components/SettingsView/MainSettings";

// export const AppState = createContext({ state: {}, dispatch: () => {} });

const App = props => {
  // Similar to componentDidMount and componentDidUpdate:
  const { state, dispatch } = useContext(Store);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Route path="/" render={props => <Navigation {...props} />} />
        <StyledApp>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} />}
          />
          <Route
            exact
            path="/schedule"
            render={props => (
              <ScheduleView dispatch={dispatch} user={state} {...props} />
            )}
          />
          <Route
            exact
            path="/progress"
            render={props => <ProgressView {...props} />}
          />
          <Route
            exact
            path="/workouts"
            render={props => <WorkoutsView {...props} />}
          />
          <Route
            exact
            path="/settings"
            render={props => (
              <MainSettingsView dispatch={dispatch} user={state} {...props} />
            )}
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
  max-width: 1040px;
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 105px;
  padding: 0 20px;
  font-family: ${props => props.theme.opensans};
`;
