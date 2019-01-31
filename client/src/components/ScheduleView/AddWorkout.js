import React, { useState, useEffect, useContext } from "react";
import { Store } from "../../index";
import styled from "styled-components";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { getDate } from "date-fns";
import FormModal from "../../shared/FormModal";
import DropDown from "../../shared/DropDown";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

const AddWorkout = props => {
  const { state, dispatch } = useContext(Store);
  const key = window.localStorage.getItem("login_token");
  const reqUrl = "https://fitmetrix.herokuapp.com/api/category/user";

  // const inputStyle = {
  //   visibility:"hidden"
  // }

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

  const initialCategoryValue = [
    { id: null, name: " --- Select a Category --- " }
  ];
  const [categories, setCategory] = useState(initialCategoryValue);
  const [categoryID, setCategoryID] = useState(null);
  const [recurring, setRecurring] = useState(false);
  const [recurringWeeks, setRecurringWeeks] = useState(0);

  //handler to schedule the workout and add it to Sworkout Database
  const scheduleWorkoutHandler = async (e, workout, date, recurringWeeks) => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");

    // add to scheduled workout array
    const workoutObj = {
      date,
      workout_id: workout.id
    };

    console.log("schedworkouthandler workoutObj:", workoutObj);

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
    }
  };

  return (
    <FormModal
      onSubmit={{ scheduleWorkoutHandler }}
      closeModal={() => dispatch({ type: "UPDATE_DATE_SELECTED" })}
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
          {props.workouts &&
            props.workouts.map(workout => {
              if (
                workout.category_id === Number(state.selectedWorkoutCategory)
              ) {
                return (
                  <WorkoutsMenu>
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
                        label="# Weeks"
                        type="number"
                        value={recurringWeeks}
                        onChange={e => setRecurringWeeks(e.target.value)}
                      />
                    //   <Input
                    //   name="recurringWeeks"
                    //   placeholder="?"
                    //   label="# Weeks"
                    //   type="number"
                    //   value={recurringWeeks}
                    //   onChange={e => setRecurringWeeks(e.target.value)}
                    //   style={inputStyle}
                    // />
                    )}

                    <Button
                      onClick={e => {
                        scheduleWorkoutHandler(
                          e,
                          workout,
                          props.selectedDate,
                          recurringWeeks
                        );
                      }}
                    >
                      Schedule
                    </Button>
                  </WorkoutsMenu>
                );
              }
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
  justify-content:space-evenly;

  margin: 10px 0;
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
