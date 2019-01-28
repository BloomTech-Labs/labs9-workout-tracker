import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import { Store } from "../../index";
import { EditWorkoutSubmitForm, StyledButton, ValueInput } from "./Style";
import CategoryDropDown from "./CategoryDropDown";

const EditWorkout = props => {
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

  useEffect(
    () => {
      const editWorkout = state.editWorkout;
      if (editWorkout !== null) {
        setTitle(state.editWorkout.title);
        setExercises(state.editWorkout.exercises);
        setCategory(state.editWorkout.id);
      }
    },
    [state.editWorkout]
  );

  //add Exercise handler
  const addExercise = async e => {
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

  const editWorkoutCall = async e => {
    e.preventDefault();

    const token = await firebase.auth().currentUser.getIdToken();

    console.log({
      title,
      exercises,
      category_id: category
    });

    const res = await axios.put(
      `https://fitmetrix.herokuapp.com/api/workouts/edit/${
        state.editWorkout.id
      }`,
      {
        title,
        exercises,
        category_id: category
      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    // REFACTOR TO NOT MAKE A EXTRA CALL MAKE UPDATED ARRAY WITH CURRENT state.workouts
    if (res.status === 200) {
      const nWorkouts = await axios.get(
        "https://fitmetrix.herokuapp.com/api/workouts/",
        {
          headers: {
            Authorization: token
          }
        }
      );

      dispatch({
        type: "UPDATE_WORKOUTS",
        payload: nWorkouts.data
      });

      dispatch({ type: "RESET_EDIT_WORKOUT" });
      setTitle("");
      setExercises([]);
      setCategory("default");
    }
  };

  return (
    <div>
      {/* Dropdown component that displays the user's categories */}
      <CategoryDropDown
        setCategory={setCategory}
        categories={state.category}
        category={category}
      />
      {/* Conditional that renders an input that allows you to add a category using a Hook */}

      <EditWorkoutSubmitForm onSubmit={e => editWorkoutCall(e)}>
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
            exercises.map((ex, i) => {
              return (
                <div key={i}>{`${ex.name}: ${ex.weight}x${ex.sets}x${
                  ex.reps
                }`}</div>
              );
            })}
        </div>

        <div>
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
        </div>

        <StyledButton onClick={e => addExercise(e)}>
          Add Exercise to Workout
        </StyledButton>

        {/* conditional for Submit button if no workouts exist */}
        {state.editWorkout.exercises.length > 0 ? (
          <StyledButton type="submit">Submit Edited Workout</StyledButton>
        ) : null}
      </EditWorkoutSubmitForm>
    </div>
  );
};
export default EditWorkout;
