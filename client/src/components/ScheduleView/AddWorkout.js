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
  const [workoutPicked, setWorkoutPicked] = useState(null);

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
      dispatch({ type: "UPDATE_SELECTED_DATE" });
    }
  };

  return (
    <FormModal
      onSubmit={{ scheduleWorkoutHandler }}
      closeModal={() => {
        dispatch({ type: "UPDATE_DATE_SELECTED" });
        dispatch({ type: "UPDATE_SELECTED_DATE" });
      }}
      title={"Schedule Workout"}
    >
      <AddWorkoutStyle>
        <div>
          <DropDownDiv>
            <DropDown
              label={"Select Category"}
              options={getOptions()}
              onChange={handleChange}
              value={state.selectedWorkoutCategory}
            />
            {workoutPicked !== null ? (
              <Button
                onClick={e => {
                  scheduleWorkoutHandler(
                    e,
                    workoutPicked,
                    state.currentDate,
                    recurringWeeks
                  );
                }}
              >
                Schedule
              </Button>
            ) : null}
          </DropDownDiv>
          {state.workouts &&
            state.workouts.map(workout => {
              const wCat = workout.category_id;
              const swCat = Number(state.selectedWorkoutCategory);
              if (wCat === swCat || state.selectedWorkoutCategory === "all") {
                return (
                  <WorkoutsMenu
                    key={workout.id}
                    onClick={() => {
                      setWorkoutPicked(workout);
                    }}
                  >
                    <TitleDiv>
                      <TitleP>{workout.title}</TitleP>
                      <p>Weight</p>
                      <p>Sets</p>
                      <p>Reps</p>
                    </TitleDiv>
                    <ExerciseListDiv>
                      {workout.exercises.map(exercise => {
                        return (
                          <ExerciseList>
                            <TitleP>{exercise.name}</TitleP>
                            <p>{exercise.weight} lbs</p>
                            <p>{exercise.sets}</p>
                            <p>{exercise.reps}</p>
                          </ExerciseList>
                        );
                      })}
                    </ExerciseListDiv>
                    {workoutPicked !== null &&
                    workoutPicked.id === workout.id ? (
                      <RecurringDiv>
                        <TitleP>Recurring ?</TitleP>
                        <input
                          size="medium"
                          type="checkbox"
                          checked={recurring}
                          onChange={e => setRecurring(e.target.checked)}
                        />
                    {workoutPicked !== null &&
                    recurring === true &&
                    workoutPicked.id === workout.id ? (
                      <Input
                        name="recurringWeeks"
                        placeholder="?"
                        label="# Weeks"
                        type="number"
                        value={recurringWeeks}
                        onChange={e => setRecurringWeeks(e.target.value)}
                      />
                    ) : null}
                      </RecurringDiv>
                    ) : null}
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

const DropDownDiv = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin-top: 11px;
  }
`;
const WorkoutsMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0;

  :hover {
    background-color: rgb(253, 143, 37, 0.6);
    color: white;
    transition: 0.4s ease-in;
  }

  h3 {
  }
  input {
  }
`;

const RecurringDiv = styled.div`
  display: flex;
  justify-content: initial;
  align-items:center;
  p {
    margin-right: 5%;
  }
  input{
    zoom:1.5margin-bottom:5px;
  }
`;

const TitleP = styled.p`
  font-weight: bold;
`;

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  p {
    width: 25%;
    font-weight: bold;

  }
`;
const ExerciseListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ExerciseList = styled.div`
  display: flex;
  justify-content: space-around;
  p {
    width: 25%;
  }
`;

export default AddWorkout;
