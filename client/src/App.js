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
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid black;
  font-size: 62.5%;
  font-size: 1.2rem;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          id: 1,
          name: "Elvis",
          email: "jlstan06@yahoo.com",
          phone: "859-598-8979",
          receives_text: true,
          recieves_email: false,
          created_at: "", //timestamp obj
          updated_at: '',
          metrics: [
            {
            id: 1,
            created_at: "", //timestamp obj
            updated_at: '',
            user_id: 1,
            dateLogged: "",
            weight: 2,
            hips: 2,
            waist: 2,
            arm_right: 2,
            arm_left: 2,
            leg_left: 2,
            leg_right: 2
          }
          ],
          workouts: [
            {
              id:1,
              title:'',
              user_id:1,
              category_id:1,
              exercises: [
                {
                  id: 1,
                  workout_id:1,
                  name: "",
                  sets: 2, //string or number
                  reps: 2,
                  weight:2,
                }
              ],
              category: 
                {
                  id: 1,
                  user_id:1,
                  name: "",
                }
            }

          ],
          schedule_workouts: [
            {
              id:1,
              date: '',
              completed: false,
              percentage: 0,
              title:'',
              user_id:1,
              category_id:1,
              schedule_exercises: [
                {
                  id: 1,
                  schedule_workout_id:1,
                  name: "",
                  sets: 2, //string or number
                  reps: 2,
                  weight:2,
                  completed:false
                }
              ],
              category: 
                {
                  id: 1,
                  user_id:1,
                  name: "",
                }
            }

          ],
        }, 
      ]
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
