import React, { useReducer, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPageView/LandingPage';
import ScheduleView from './components/ScheduleView/ScheduleView';
import ProgressView from './components/ProgressView/ProgressView';
import WorkoutsView from './components/WorkoutsView/WorkoutsView';
import SettingsView from './components/SettingsView/SettingsView';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './StyleTheme';
import firebase from 'firebase';
import userData from './mockData';

const App = props => {
  const initialState = {
    user: userData
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'userModel':
        return { ...state, user: action.payload };
        case "UPDATE_S_EXERCISE":
        //Create a variable that points to schedule workouts on state
      const sw = [...state.user.scheduleWorkouts];
        let wIndex = null;
       //Loop through scheduledworkouts 
       sw.forEach((w , i)=> {
          if (w.id == action.payload.wID) {
            //assign the id that is in the payload
            wIndex = i
          }
        });
        let exIndex = null;

        sw[wIndex].exercises.forEach((ex, i) => {
          if (ex === action.payload.eId) {
            exIndex = i;
          }
        })

       let userObj = {...state.user};
       console.log("userObj form state: ", userObj)
       userObj.scheduleWorkouts[wIndex].exercises[exIndex]= action.payload.exercise
        // console.log("updated userexercises: ", userObj.scheduleWorkouts[wIndex].exercises[exIndex])
        console.log("updated userexercises: ", userObj)
      return {...state, user: {
        ...state.user,
        ...userObj
       }};




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
      apiKey: 'AIzaSyAQRB_UBjCXzDmxluLuDiM-VUjEoi9HjnQ',
      authDomain: 'fitmetrix-57cce.firebaseapp.com',
      databaseURL: 'https://fitmetrix-57cce.firebaseio.com',
      projectId: 'fitmetrix-57cce',
      storageBucket: 'fitmetrix-57cce.appspot.com',
      messagingSenderId: '771224902694'
    };
    firebase.initializeApp(config);
  }, []);

  const getUserInfo = async () => {
    console.log('getUserInfo called');
    const token = window.localStorage.getItem('login_token');

    const user = await axios.get('https://fitmetrix.herokuapp.com/api/user', {
      headers: {
        Authorization: token
      }
    });

    dispatch({ type: 'userModel', payload: user.data });
  };

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
                dispatch={dispatch}
                getUserInfo={getUserInfo}
              />
            )}
          />
          <Route
            exact
            path="/progress"
            render={props => (
              <ProgressView
                {...props}
                user={state.user}
                getUserInfo={getUserInfo}
              />
            )}
          />
          <Route
            exact
            path="/workouts"
            render={props => (
              <WorkoutsView
                {...props}
                workouts={state.user.workouts}
                getUserInfo={getUserInfo}
              />
            )}
          />
          <Route
            exact
            path="/settings"
            render={props => (
              <SettingsView
                {...props}
                user={state.user}
                getUserInfo={getUserInfo}
              />
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
  position: relative;
  background-color: transparent;
  padding: 0 30px;
  font-family: ${props => props.theme.opensans};
`;

