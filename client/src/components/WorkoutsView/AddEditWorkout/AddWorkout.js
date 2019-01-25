import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import { Store } from "../../index";
import { AddWorkoutSubmitForm, StyledButton, ValueInput } from "./Style";
import CategoryDropDown from "./CategoryDropDown";

const AddWorkout = props => {
  const { state, dispatch } = useContext(Store);

  //Sets first Category in the dropdown list
  const [category, setCategory] = useState("default");

  //  Create variable to store workout
  let initialWorkoutValue = {
    category_id: null,
    title: "",
    exercises: []
  };

  //Hook to set workout Title
  const [title, setTitle] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [exercises, setExercises] = useState([]);

  // hook to set the workouts to add
  const [workout, setWorkout] = useState(initialWorkoutValue);

  //add Exercise handler
  const addWorkout = async e => {
    e.preventDefault();

    let nExercise = {
      name: exerciseName,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps)
    };

    //adds exercise to exercises array in the workout being created/edited and resets the input fields
    setExercises([...exercises, nExercise]);
    setExerciseName("");
    setWeight("");
    setSets("");
    setReps("");
  };

  // add workout handler to add workout to database
  const addNewWorkout = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");

    //Sets the workout title and category id and sends a POST request to the backend to add the created workout
    workout.title = title;
    workout.category_id = Number(category);
    console.log("the current workout is: ", workout);

    if (token !== undefined) {
      const res = await axios.post(
        "https://fitmetrix.herokuapp.com/api/workouts/",
        workout,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      );
      console.log("the current workout is: ", workout);
    }
    //Resets the title and category after workout is added
    setTitle("");
    setCategory("default");
  };

  return (
    <div>
      {/* Dropdown component that displays the user's categories */}
      <CategoryDropDown
        setCategory={setCategory}
        categories={state.category}
        category={category}
      />
      <AddWorkoutSubmitForm onSubmit={e => addNewWorkout(e)}>
        {/* Conditional  in ValueInput that updates the input value to the title of the selected workout that is being Edited*/}
        <ValueInput
          value={title}
          type="text"
          placeholder="Workout Title"
          onChange={e => setTitle(e.target.value)}
          required
        />
        {/* Conditional that renders the exercises that have been added to the workout that is being created */}
        <div>
          {exercises &&
            exercises.map(ex => {
              return (
                <div>{`${ex.name}: ${ex.weight}x${ex.sets}x${ex.reps}`}</div>
              );
            })}
        </div>

        <>
          {/* Inputs to add an exercise */}
          <ValueInput
            value={exerciseName}
            type="text"
            placeholder="Exercise Name"
            onChange={e => setExerciseName(e.target.value)}
          />
          <ValueInput
            value={weight}
            type="text"
            placeholder="Weight"
            onChange={e => setWeight(e.target.value)}
          />
          <ValueInput
            value={sets}
            type="text"
            placeholder="Sets"
            onChange={e => setSets(e.target.value)}
          />

          <ValueInput
            value={reps}
            type="text"
            placeholder="Reps"
            onChange={e => setReps(e.target.value)}
          />
        </>

        <StyledButton onClick={e => addExercise(e)}>
          Add Exercise to Workout
        </StyledButton>
        {/* conditional for Submit button if no workouts exist */}
        {exercises.length > 0 ? (
          <StyledButton>Submit Workout</StyledButton>
        ) : null}
      </AddWorkoutSubmitForm>
    </div>
  );
};

export default AddWorkout;
