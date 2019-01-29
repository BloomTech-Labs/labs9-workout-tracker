import React, { useState, useEffect, useContext } from "react";
import { Store } from "../../index";
import styled from "styled-components";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { getDate } from "date-fns";

const AddWorkout = props => {
  const { state, dispatch } = useContext(Store);
  const key = window.localStorage.getItem("login_token");
  const reqUrl = "https://fitmetrix.herokuapp.com/api/category/user";

  const initialCategoryValue = [
    { id: null, name: " --- Select a Category --- " }
  ];
  const [categories, setCategory] = useState(initialCategoryValue);
  const [categoryID, setCategoryID] = useState(null);
  const [recurring, setRecurring] = useState(false);
  const [recurringWeeks, setRecurringWeeks] = useState(false);

  //create category component variable to put in the dropdown.
  let categoryComponent = null;

  // useEffect to get Categories from the backend
  useEffect(() => {
    axios.get(reqUrl, { headers: { Authorization: key } }).then(
      result => (
        console.log("the result is: ", result.data),
        result.data.map(res => {
          console.log("the res is: ", res);
          initialCategoryValue.push(res);
          console.log("initialCategoryValue:", initialCategoryValue);
          return setCategory(initialCategoryValue);
        })
      )
    );
  }, []);

  // method to handle selecting a category from dropdown
  const categorySelectionHandler = event => {
    let value = event.target.value;
    console.log("value", value);
    console.log("categories", categories);
    const categoryIndex = categories.filter(category => {
      return category.id === Number(value);
    });
    setCategoryID(categoryIndex[0].id);
  };

  //Puts the categories into a component
  categoryComponent = (
    <select
      onChange={e => {
        categorySelectionHandler(e);
      }}
      value={categories}
    >
      {categories.map((category, index) => (
        <option value={category.id} key={index}>
          {category.name}
        </option>
      ))}
    </select>
  );

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
    <AddWorkoutStyle>
      <form>
        <div>
          <div>{categoryComponent}</div>
          {props.workouts &&
            props.workouts.map(workout => {
              if (workout.id === categoryID) {
                return (
                  <div>
                    <div>{workout.title}</div>
                    Recurring ?{" "}
                    <input
                      type="checkbox"
                      checked={recurring}
                      onChange={e => setRecurring(e.target.checked)}
                    />
                    next{" "}
                    <input
                      type="number"
                      value={recurringWeeks}
                      onChange={e => setRecurringWeeks(e.target.value)}
                    />{" "}
                    weeks
                    <button
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
                    </button>
                  </div>
                );
              }
            })}
        </div>
      </form>
    </AddWorkoutStyle>
  );
};

const AddWorkoutStyle = styled.div`
  border: 1px solid purple;
`;

export default AddWorkout;
