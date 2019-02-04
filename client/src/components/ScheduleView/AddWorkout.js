import React, { useState, useEffect, useContext } from "react";
import { Store } from "../../index";
import styled from "styled-components";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import FormModal from "../../shared/FormModal";
import DropDown from "../../shared/DropDown";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

const AddWorkout = props => {

  const { state, dispatch } = useContext(Store);

  const getOptions = () => {
    let options = state.category.map((cat, i) => {
      return {
        name: cat.name,
        value: cat.id,
        key: cat.id
      };
    });

    options.unshift({
      name: "All",
      value: "all",
      key: "all"
    });

    return options;
  };

  const handleChange = value => {
    console.log("value:", value);
    dispatch({
      type: "UPDATE_SELECTED_WORKOUTS_CATEGORY",
      payload: value
    });
  };

  const [recurring, setRecurring] = useState(false);
  const [recurringWeeks, setRecurringWeeks] = useState(0);

  //handler to schedule the workout and add it to Sworkout Database
  const scheduleWorkoutHandler = async (e, workout, date, recurringWeeks) => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");

    const workoutObj = {
      date,
      workout_id: workout.id
    };

    const scheduleWorkout = await axios
      .post("https://fitmetrix.herokuapp.com/api/schedule/create", workoutObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
      .catch(err => console.log(err));

    if (recurring === true) {
      //Adds 7 days to the incoming date
      const addSevenDays = (date, seven) => {
        let result = new Date(date);
        result.setDate(result.getDate() + seven);
        return result;
      };

      for (let i = 1; i <= recurringWeeks - 1; i++) {
        const nextWeek = addSevenDays(date, 7);
        let nextWeekObj = new Date(nextWeek);
        console.log(nextWeekObj);
        const recurringWorkoutObj = {
          date: nextWeekObj,
          workout_id: workout.id
        };

        date = nextWeek;

        const scheduleRecurringWorkout = await axios
          .post(
            "https://fitmetrix.herokuapp.com/api/schedule/create",
            recurringWorkoutObj,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            }
          )
          .catch(err => console.log(err));
      }
    }

    // const token = await firebase.auth().currentUser.getIdToken();
    if (scheduleWorkout.status === 201) {
      console.log("I AM HERE");
      const newSW = await axios.get(
        "https://fitmetrix.herokuapp.com/api/schedule",
        {
          headers: {
            Authorization: token
          }
        }
      );

      dispatch({
        type: "UPDATE_SCHEDULE_WORKOUTS",
        payload: newSW.data
      });
      dispatch({ type: "UPDATE_DATE_SELECTED" });
      dispatch({type:"UPDATE_SELECTED_DATE"});
    }
  };

  return (
    <FormModal
      onSubmit={{ scheduleWorkoutHandler }}
      closeModal={() => {dispatch({ type: "UPDATE_DATE_SELECTED" });  dispatch({type:"UPDATE_SELECTED_DATE"})}}
      title={"Add Workout"}
    >
      <AddWorkoutStyle>
        <div>
          <DropDown
            label={"Select Category"}
            options={getOptions()}
            onChange={handleChange}
            value={state.selectedWorkoutCategory}
          />
          {state.workouts &&
            state.workouts.map(workout => {
              const wCat = workout.category_id;
              const swCat = Number(state.selectedWorkoutCategory);
              if ( wCat === swCat ) {
                return (
                  <WorkoutsMenu key={workout.id}>
                    <h3>{workout.title}</h3>
                    <p>Recurring ?</p>
                    <input
                      size="medium"
                      type="checkbox"
                      checked={recurring}
                      onChange={e => setRecurring(e.target.checked)}
                    />
                    {recurring ? (
                      <Input
                        name="recurringWeeks"
                        placeholder="?"
                        label="# Weeks"
                        type="number"
                        value={recurringWeeks}
                        onChange={e => setRecurringWeeks(e.target.value)}
                      />
                    ) : (
                      <Input
                        name="recurringWeeks"
                        placeholder="?"
                        isDisabled="true"
                        label="Weeks"
                        type="number"
                        value={recurringWeeks}
                        onChange={e => setRecurringWeeks(e.target.value)}
                      />
                    )}

                    <Button
                      onClick={e => {
                        scheduleWorkoutHandler(
                          e,
                          workout,
                          state.currentDate,
                          recurringWeeks
                        );
                      }}
                    >
                      Schedule
                    </Button>
                  </WorkoutsMenu>
                );
              }
              return null;
            })}
        </div>
      </AddWorkoutStyle>
    </FormModal>
  );
};

const AddWorkoutStyle = styled.div``;

const WorkoutsMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  margin: 10px 0;
  h3 {
    width: 25%;
    max-width: 200px;
  }
  input {
  }
  button {
    margin: 0 5%;
  }
  p {
    margin-left: 10%;
  }
`;



export default AddWorkout;
