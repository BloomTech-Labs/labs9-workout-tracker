import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { getDate } from "date-fns";


const AddWorkout = props => {
  const key = window.localStorage.getItem("login_token");
  const reqUrl = "https://fitmetrix.herokuapp.com/api/category/user";

  const initialCategoryValue = [
    { id: null, name: " --- Select a Category --- " }
  ];
  const [categories, setCategory] = useState(initialCategoryValue);
  const [categoryID, setCategoryID] = useState(null);
  const [recurring, setRecurring] = useState(false);



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
  const scheduleWorkoutHandler = async (e, workout, date) => {
    e.preventDefault();
    const token = window.localStorage.getItem('login_token');
    
    // add to scheduled workout array
    const workoutObj = {
      date,
      workout_id: workout.id
    }
    
    //Buggy. If at the end of the month, returns an invalid date. NEed to refactor this.
     const addSevenDays = (date) => {
      let strSplit = date.toString().split(" ")
      console.log(strSplit[2])
      strSplit[2] = Number(strSplit[2]) + 7
      return strSplit.join(" ")
      }
      const nextWeek = addSevenDays(date)
      let nextWeekObj = new Date(nextWeek)
   
      const recurringWorkoutObj = {
      date: nextWeekObj,
      workout_id: workout.id
    }
    console.log("schedworkouthandler workoutObj:", workoutObj);
    console.log("schedworkouthandler recurringWorkoutObj:", recurringWorkoutObj);

    const scheduleWorkout = await axios.post("https://fitmetrix.herokuapp.com/api/schedule/create", workoutObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .catch(err => console.log(err))
if (recurring === true) {

  const scheduleRecurringWorkout = await axios.post("https://fitmetrix.herokuapp.com/api/schedule/create", recurringWorkoutObj, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
  .catch(err => console.log(err))

}

    

  };

  return (
    <AddWorkoutStyle>
      <form>
        <div>
          <div>{categoryComponent}</div>
          {props.workouts &&
            props.workouts.map(workout => {
              console.log("map workout:", workout);
              console.log("map categoryID:", categoryID);
              if (workout.id === categoryID) {
                return (
                  <div>
                    <div>{workout.title}</div>
                    Recurring ? <input type='checkbox' checked={recurring} onChange={e=> setRecurring(e.target.checked)}/>
                    <button
                      onClick={ (e) => {
                        scheduleWorkoutHandler(e, workout, props.selectedDate)
                       } }
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
