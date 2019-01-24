import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";


const AddWorkout = props => {
  const key = window.localStorage.getItem("login_token");
  const reqUrl = "https://fitmetrix.herokuapp.com/api/category/user";

  const initialCategoryValue = [
    { id: null, name: " --- Select a Category --- " }
  ];
  const [categories, setCategory] = useState(initialCategoryValue);
  const [categoryID, setCategoryID] = useState(null);



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
    //incoming workout object
    console.log("schedworkouthandler date:", date);
    console.log("schedworkouthandler wkt:", workout);
    // add to scheduled workout array
    const workoutObj = {
      date,
      workout_id: workout.id
    }
    const recurringWorkoutObj = {
      date,
      workout_id: workout.id
    }
    console.log("schedworkouthandler wktOBJ:", workoutObj);

    const scheduleWorkout = await axios.post("https://fitmetrix.herokuapp.com/api/schedule/create", workoutObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .catch(err => console.log(err))

    // const scheduleRecurringWorkout = await axios.post("https://fitmetrix.herokuapp.com/api/schedule/create", recurringWorkoutObj, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: token
    //   }
    // })
    // .catch(err => console.log(err))

    

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
