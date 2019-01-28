import React, { useContext, useState, useEffect } from "react";
import { Store } from "../../../index";
import axios from "axios";
import * as firebase from "firebase";
import styled from "styled-components";
import CategoryDropDown from "./CategoryDropDown";

const AddWorkouts = () => {
  //Accesses state and dispatch with the useContext Hook.
  const { state, dispatch } = useContext(Store);

  const { category } = state;

  //A useState Hook to update the selected category on state.
  const [selectedCategory, setSelectedCategory] = useState("");

  //Maps through the user's categories on state and returns the category names. Is used in the dropdown onChange.
  const categoryOptions = category.map(cate => {
    return {
      key: cate.id,
      text: cate.name,
      value: cate.id
    };
  });

  //Hook to set workout Title
  const [title, setTitle] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [exercises, setExercises] = useState([]);

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

  // add new workout handler to add workout to database
  const addNewWorkout = async e => {
    e.preventDefault();
    console.log("hello from addNewWorkout");
    const token = window.localStorage.getItem("login_token");
    console.log("the state.selectedCategory is: ", state.selectedCategory);

    //Sets the workout title and category id and sends a POST request to the backend to add the created workout

    const workout = {
      title,
      category_id: Number(state.selectedCategory)
    };
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
    setSelectedCategory("default");
  };

  return (
    <Container onSubmit={e => addNewWorkout(e)}>
      <h2>Add Workouts</h2>
      <Row>
        <NameInput
          value={title}
          placeholder="Workout Title"
          type="text"
          onChange={e => setTitle(e.target.value)}
          required
        />
        <CategoryDropDown />
      </Row>
      <Row>
        <NameInput
          value={exerciseName}
          type="text"
          placeholder="Exercise Name"
          onChange={e => setExerciseName(e.target.value)}
        />
        <ExerciseInput
          value={weight}
          type="text"
          placeholder="Weight"
          onChange={e => setWeight(e.target.value)}
        />
        <ExerciseInput
          value={sets}
          type="text"
          placeholder="Sets"
          onChange={e => setSets(e.target.value)}
        />
        <ExerciseInput
          value={reps}
          type="text"
          placeholder="Reps"
          onChange={e => setReps(e.target.value)}
        />
        <span>x</span>
      </Row>
      {/* Conditional that renders the exercises that have been added to the workout that is being created */}
      <div>
        {exercises &&
          exercises.map(ex => {
            return (
              <div>
                <Row>
                  <NameInput
                    value={ex.name}
                    type="text"
                    placeholder="Exercise Name"
                  />
                  <ExerciseInput
                    value={ex.weight}
                    type="text"
                    placeholder="Weight"
                  />
                  <ExerciseInput
                    value={ex.sets}
                    type="text"
                    placeholder="Sets"
                  />
                  <ExerciseInput
                    value={ex.reps}
                    type="text"
                    placeholder="Reps"
                  />
                </Row>
              </div>
            );
          })}
      </div>
      <Row>
        <AddExerciseButton type="button" onClick={e => addExercise(e)}>
          Add Exercise to Workout
        </AddExerciseButton>
      </Row>

      <Row>
        <SubmitButton type="submit">Submit Workout</SubmitButton>
      </Row>
    </Container>
  );
};

export default AddWorkouts;

const AddExerciseButton = styled.button`
  width: 100%;
  height: 36px;
  color: ${props => props.theme.primaryDark};
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.4);
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 36px;
  color: ${props => props.theme.primaryDark};
  background-color: ${props => props.theme.accent};
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.4);
`;

const NameInput = styled.input`
  width: 245px;
  height: 36px;
  border-radius: 4px;
`;

const ExerciseInput = styled.input`
  width: 100px;
  height: 36px;
  border-radius: 4px;
`;

const Container = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Row = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
