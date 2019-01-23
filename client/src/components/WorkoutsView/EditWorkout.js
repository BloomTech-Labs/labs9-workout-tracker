import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

const EditWorkout = props => {
  const key = window.localStorage.getItem("login_token");

  const reqUrl = "https://fitmetrix.herokuapp.com/api/category/user";

  //Sets first Category in the dropdown list

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

  //useState hooks to set the Category that was chosen
  const [category, setCategory] = useState("default");
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState("");

  // //useState hooks to set the CategoryId that was chosen
  // const [categoryId, setCategoryId] = useState(initialCategoryId);
  // hook to set the workouts to add
  const [workout, setWorkout] = useState(initialWorkoutValue);

  // useEffect to get Categories from the backend
  // hook to set the workouts to add
  const [workout, setWorkout] = useState(initialWorkoutValue);

  // useEffect to get Categories from the backend
  useEffect(() => {
    console.log("Inside effect 1");
    axios.get(reqUrl, { headers: { Authorization: key } }).then(result => {
      console.log("the result is: ", result.data);
      setCategories(result.data);
    });
  }, []);

  //add Exercise handler
  const addExercise = async e => {
    e.preventDefault();

    let nExcercise = {
      name: exerciseName,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps)
    };

    workout.exercises.push(nExcercise);
    setExerciseName("");
    setWeight("");
    setSets("");
    setReps("");
  };

  // add workout handler to add workout to database
  const addWorkout = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");

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
    setTitle("");
    setCategory("");
  };

  //add Category handler
  const submitCategory = async e => {
    e.preventDefault();
    console.log("Adding a category", addCategory);

    const token = window.localStorage.getItem("login_token");

    if (token !== undefined) {
      const res = await axios.post(
        "https://fitmetrix.herokuapp.com/api/category/create",
        {
          name: addCategory,
          user_id: props.user.id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      );
      console.log("the current category is: ", addCategory);
    }
    setAddCategory("");
  };

  //Puts the categories into a component
  const categoryComponent = (
    <select onChange={e => setCategory(e.target.value)} value={category}>
      <option value={"default"}>--- Select a Category ---</option>
      {categories &&
        categories.map((category, index) => (
          <option value={category.id} key={index}>
            {category.name}
          </option>
        ))}
      <option value={"addCategory"}>--- Add a Category ---</option>
    </select>
  );

  return (
    <EditWorkoutSubmitForm onSubmit={e => addWorkout(e)}>
      <ValueInput
        value={title}
        type="text"
        placeholder="Workout Title"
        onChange={e => setTitle(e.target.value)}
        required
      />
      <div>{categoryComponent}</div>

      {category === "addCategory" ? (
        <>
          <ValueInput
            value={addCategory}
            type="text"
            placeholder="Category Name"
            onChange={e => setAddCategory(e.target.value)}
          />
          <StyledButton type="button" onClick={e => submitCategory(e)}>
            Add Category
          </StyledButton>
        </>
      ) : null}

      <div>
        {workout.exercises &&
          workout.exercises.map(ex => {
            return (
              <div>{`${ex.name}: ${ex.weight}x${ex.sets}x${ex.reps}`}</div>
            );
          })}
      </div>
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
      <StyledButton onClick={e => addExercise(e)}>Add Exercise</StyledButton>

      {/* conditional for Submit button if no workouts exist */}
      {workout.exercises.length > 0 ? (
        <StyledButton>Submit</StyledButton>
      ) : null}
    </EditWorkoutSubmitForm>
  );
};

export default EditWorkout;

const EditWorkoutSubmitForm = styled.form`
  font-family: ${props => props.theme.roboto};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 250px;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 20px 10px;
`;

const StyledButton = styled.button`
  height: 40px;
  width: 100%;
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.5em;
  background-color: ${props => props.theme.primaryDark};
  border: none;
  border-radius: 6px;
  color: white;
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const ValueInput = styled.input`
  height: 30px;
  width: 100%;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
`;
