import React, { useReducer, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import userData from './mockData';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';

export const Store = createContext({ state: {}, dispatch: () => {} });

const initialState = {
  ...userData,
  editWorkout: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_MODEL':
      return { ...state, ...action.payload };
    case "UPDATE_METRICS":
      return {...state, metrics: [...action.payload]}
    case "UPDATE_SCHEDULE_WORKOUTS":
      return {...state, schedule_workouts: [...action.payload]}
    case "CONTEXT_TEST":
      console.log("hi from reducer");
      return { ...state };
    case 'EDIT_WORKOUT':
      console.log('hi edit workout');
      return { ...state, editWorkout: { ...action.payload } };
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
};

const AppContainer = () => {
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

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <Store.Provider value={{ state, dispatch }}>
        <App />
      </Store.Provider>
    </Router>
  );
};

ReactDOM.render(<AppContainer />, document.getElementById('root'));
