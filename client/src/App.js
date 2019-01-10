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

// const url = `https://labs9-workout-tracker.herokuapp.com/api`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: 0,
        name: "Immanuel Gaylord",
        email: "Kaylee81@hotmail.com",
        phone: "230.496.0750 x777",
        recieves_text: 0,
        recieves_email: 0,
        created_at: "2019-01-09 22:25:30",
        updated_at: "2019-01-09 22:25:30",
        metrics: [
          {
            id: 0,
            created_at: "2019-01-09 22:25:30",
            updated_at: "2019-01-09 22:25:30",
            weight: 8.949818178792476,
            hips: 10.184543677436714,
            waist: 1.3451471321703026,
            arm_right: 5.538224545827334,
            arm_left: 10.74578566478397,
            leg_right: 5.995551222956152,
            leg_left: 2.3589887488329278,
            date: "2019-01-09 22:25:30",
            user_id: 0
          },
          {
            id: 0,
            created_at: "2019-01-10 22:25:30",
            updated_at: "2019-01-10 22:25:30",
            weight: 18.949818178792476,
            hips: 15.184543677436714,
            waist: 2.3451471321703026,
            arm_right: 50.538224545827334,
            arm_left: 100.74578566478397,
            leg_right: 50.995551222956152,
            leg_left: 20.3589887488329278,
            date: "2019-01-10 22:25:30",
            user_id: 0
          }
        ],
        workouts: [
          {
            id: 0,
            user_id: 0,
            category_id: 0,
            title: "Deadlift Day #1",
            exercises: [
              {
                id: 1,
                workout_id: 0,
                name: "Deadlift",
                weight: 315,
                sets: 5,
                reps: 5
              },
              {
                id: 2,
                workout_id: 0,
                name: "Squats",
                weight: 275,
                sets: 5,
                reps: 5
              },
              {
                id: 3,
                workout_id: 0,
                name: "Lunges",
                weight: 25,
                sets: 3,
                reps: 24
              }
            ],
            category: {
              id: 0,
              name: "Legs",
              user_id: 0
            }
          }
        ],
        scheduleWorkouts: [
          {
            id: 1,
            date: "2019-01-03",
            completed: 0,
            percentage: 0,
            title: "Deadlift Day #1",
            category_id: 1,
            user_id: 0,
            exercises: [
              {
                id: 4,
                schedule_workout_id: 1,
                name: "Deadlift",
                weight: 315,
                sets: 5,
                reps: 5,
                completed: 0
              },
              {
                id: 5,
                schedule_workout_id: 1,
                name: "Squats",
                weight: 275,
                sets: 5,
                reps: 5,
                completed: 0
              },
              {
                id: 6,
                schedule_workout_id: 1,
                name: "Lunges",
                weight: 25,
                sets: 3,
                reps: 24,
                completed: 0
              }
            ],
            category: {
              id: 1,
              name: "Legs",
              user_id: 1
            }
          }
        ]
      }
    };
  }

  componentDidMount() {
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
      <StyledApp>
        {/* <div>{this.state.user.name}</div> */}
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/schedule"
          render={props => (
            <ScheduleView {...props} workouts={this.state.user.workouts} scheduleWorkouts={this.state.user.scheduleWorkouts} />
          )}
        />
        <Route
          exact
          path="/progress"
          render={props => <ProgressView {...props} user={this.state.user} />}
        />

        <Route
          exact
          path="/workouts"
          render={props => (
            <WorkoutsView {...props} workouts={this.state.user.workouts} />
          )}
        />
        <Route exact path="/settings" component={SettingsView} />
        <Route exact path="/billing" component={BillingView} />
      </StyledApp>
    );
  }
}

export default App;

const StyledApp = styled.div`
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid black;
  font-size: 62.5%;
  font-size: 1.2rem;
  height: 100vh;
`;

//user: {
//   id: 1,
//   name: "Elvis",
//   email: "jlstan06@yahoo.com",
//   phone: "859-598-8979",
//   receives_text: true,
//   recieves_email: false,
//   created_at: "", //timestamp obj
//   updated_at: "",
//   metrics: [
//     {
//       id: 1,
//       created_at: "", //timestamp obj
//       updated_at: "",
//       user_id: 1,
//       dateLogged: "",
//       weight: 2,
//       hips: 2,
//       waist: 2,
//       arm_right: 2,
//       arm_left: 2,
//       leg_left: 2,
//       leg_right: 2
//     }
//   ],
//   workouts: [
//     {
//       id: 1,
//       title: "",
//       user_id: 1,
//       category_id: 1,
//       exercises: [
//         {
//           id: 1,
//           workout_id: 1,
//           name: "",
//           sets: 2, //string or number
//           reps: 2,
//           weight: 2
//         }
//       ],
//       category: {
//         id: 1,
//         user_id: 1,
//         name: ""
//       }
//     }
//   ],
//   schedule_workouts: [
//     {
//       id: 1,
//       date: "",
//       completed: false,
//       percentage: 0,
//       title: "",
//       user_id: 1,
//       category_id: 1,
//       schedule_exercises: [
//         {
//           id: 1,
//           schedule_workout_id: 1,
//           name: "",
//           sets: 2, //string or number
//           reps: 2,
//           weight: 2,
//           completed: false
//         }
//       ],
//       category: {
//         id: 1,
//         user_id: 1,
//         name: ""
//       }
//     }
//   ]
//}
