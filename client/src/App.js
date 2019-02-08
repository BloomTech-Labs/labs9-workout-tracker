import React, { Suspense, useState, useContext, lazy } from "react";
import { Route } from "react-router-dom";

import Loader from "react-loader-spinner";

import LandingPage from "./components/LandingPageView/LandingPage";

import Navigation from "./components/Navigation";

// import WorkoutsView from "./components/WorkoutsView";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "./StyleTheme";
import { Store } from "./index";

// export const AppState = createContext({ state: {}, dispatch: () => {} });

const WorkoutsView = lazy(() => import("./components/WorkoutsView"));

const ScheduleView = lazy(() => import("./components/ScheduleView"));
const ProgressView = lazy(() => import("./components/ProgressView"));
const SettingsView = lazy(() =>
  import("./components/SettingsView/SettingsView")
);
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

const MainSettingsView = lazy(() =>
  import("./components/SettingsView/MainSettings")
);

const ForgotPassword = lazy(() => import("./components/ForgotPassword"));

const PasswordReset = lazy(() => import("./components/PasswordReset"));

const App = props => {
  // Similar to componentDidMount and componentDidUpdate:
  const { state, dispatch } = useContext(Store);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Route path="/" render={props => <Navigation {...props} />} />
        <StyledApp>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route
            exact
            path="/login"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <Login {...props} />
              </Suspense>
            )}
          />
          <Route
            exact
            path="/register"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <Register {...props} />
              </Suspense>
            )}
          />
          <Route
            exact
            path="/schedule"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <ScheduleView dispatch={dispatch} user={state} {...props} />
              </Suspense>
            )}
          />
          <Route
            exact
            path="/progress"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <ProgressView {...props} />
              </Suspense>
            )}
          />

          <Route
            exact
            path="/workouts"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <WorkoutsView {...props} />
              </Suspense>
            )}
          />

          <Route
            exact
            path="/settings"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <MainSettingsView dispatch={dispatch} user={state} {...props} />
              </Suspense>
            )}
          />

          <Route
            exact
            path="/forgot"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <ForgotPassword {...props} />
              </Suspense>
            )}
          />

          <Route
            path="/reset/"
            render={props => (
              <Suspense
                fallback={
                  <Loader
                    type="Ball-Triangle"
                    color="#FD8F25"
                    height="180"
                    width="120"
                  />
                }
              >
                <PasswordReset {...props} />
              </Suspense>
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
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 105px;
  font-family: ${props => props.theme.opensans};
  @media (max-width: 768px) {
    margin-top: 75px;
  }
`;
