import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import * as firebase from 'firebase';
import { Store } from '../../index';

const EditWorkout = props => {
  const { state, dispatch } = useContext(Store);

  //Sets first Category in the dropdown list

  //  Create variable to store workout
  let initialWorkoutValue = {
    category_id: null,
    title: '',
    exercises: []
  };

  //Hook to set workout Title
  const [title, setTitle] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  //useState hooks to set the Category that was chosen
  const [category, setCategory] = useState('default');
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState('');

  // hook to set the workouts to add
  const [workout, setWorkout] = useState(initialWorkoutValue);

  // useEffect to get Categories from the backend
  useEffect(
    () => {
      setCategories(state.categories);
    },
    [state]
  );

  //add Exercise handler
  const addExercise = async e => {
    e.preventDefault();

    let nExcercise = {
      name: exerciseName,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps)
    };

    //adds exercise to exercises array in the workout being created/edited and resets the input fields
    workout.exercises.push(nExcercise);
    setExerciseName('');
    setWeight('');
    setSets('');
    setReps('');
  };

  // add workout handler to add workout to database
  const addWorkout = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem('login_token');

    //Sets the workout title and category id and sends a POST request to the backend to add the created workout
    workout.title = title;
    workout.category_id = Number(category);
    console.log('the current workout is: ', workout);

    if (token !== undefined) {
      const res = await axios.post('https://fitmetrix.herokuapp.com/api/workouts/', workout, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      console.log('the current workout is: ', workout);
    }
    //Resets the title and category after workout is added
    setTitle('');
    setCategory('');
  };

  //add Category handler
  const submitCategory = async e => {
    e.preventDefault();
    console.log('Adding a category', addCategory);

    const token = window.localStorage.getItem('login_token');

    // adds the created category to a user's available categories
    if (token !== undefined) {
      const res = await axios.post(
        'https://fitmetrix.herokuapp.com/api/category/create',
        {
          name: addCategory,
          user_id: props.user.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );
      console.log('the current category is: ', addCategory);
    }
    //Resets the category to default after it's been added
    setAddCategory('');
  };

  //Puts the categories into a dropdown component
  const categoryComponent = (
    //setCategory is used to set the value of `category`
    <select onChange={e => setCategory(e.target.value)} value={state.category}>
      <option value={'default'}>--- Select a Category ---</option>
      {/* Maps through the categories on state and populates the list with the category names*/}
      {state.category &&
        state.category.map((category, index) => (
          <option value={category.id} key={index}>
            {category.name}
          </option>
        ))}
      {/* Gives an option to add a category with the default value from the setAddCategory Hook*/}
      <option value={'addCategory'}>--- Add a Category ---</option>
    </select>
  );

  return (
    // This form uses a Hook to submit the workout
    <EditWorkoutSubmitForm onSubmit={e => addWorkout(e)}>
      {/* Conditional  in ValueInput that updates the input value to the title of the selected workout that is being Edited*/}
      <ValueInput
        value={state.editWorkout ? state.editWorkout.title : title}
        type="text"
        placeholder="Workout Title"
        onChange={e => setTitle(e.target.value)}
        required
      />
      {/* Dropdown component that displays the user's categories */}
      <div>{categoryComponent}</div>

      {/* Condiitonal that renders an input that allows you to add a category using a Hook */}
      {category === 'addCategory' ? (
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

      {/* Condiitonal that renders the exercises that have been added to the workout that is being created */}
      <div>
        {workout.exercises &&
          workout.exercises.map(ex => {
            return <div>{`${ex.name}: ${ex.weight}x${ex.sets}x${ex.reps}`}</div>;
          })}
      </div>

      {/* Condiitonal checks if a workout is being edited and changes the add workout fields to null and renders the workout (and exercises) that have been selected to be edited */}
      {state.editWorkout ? (
        state.editWorkout.exercises.map(ex => {
          let [editExerciseName, setEditExerciseName] = useState(ex.name);
          let [editWeight, setEditWeight] = useState(ex.weight);
          let [editSets, setEditSet] = useState(ex.sets);
          let [editReps, setEditReps] = useState(ex.reps);
          return (
            <div>
              <ValueInput
                value={editExerciseName}
                type="text"
                placeholder="Exercise Name"
                onChange={e => setEditExerciseName(e.target.value)}
              />
              <ValueInput
                value={editWeight}
                type="text"
                placeholder="Weight"
                onChange={e => setEditWeight(e.target.value)}
              />
              <ValueInput value={editSets} type="text" placeholder="Sets" onChange={e => setEditSet(e.target.value)} />
              <ValueInput value={editReps} type="text" placeholder="Reps" onChange={e => setEditReps(e.target.value)} />
            </div>
          );
        })
      ) : (
        <>
          {/* Inputs to add an exercise */}
          <ValueInput
            value={exerciseName}
            type="text"
            placeholder="Exercise Name"
            onChange={e => setExerciseName(e.target.value)}
          />
          <ValueInput value={weight} type="text" placeholder="Weight" onChange={e => setWeight(e.target.value)} />
          <ValueInput value={sets} type="text" placeholder="Sets" onChange={e => setSets(e.target.value)} />

          <ValueInput value={reps} type="text" placeholder="Reps" onChange={e => setReps(e.target.value)} />
        </>
      )}

      <StyledButton onClick={e => addExercise(e)}>Add Exercise</StyledButton>

      {/* conditional for Submit button if no workouts exist */}
      {workout.exercises.length > 0 ? <StyledButton>Submit</StyledButton> : null}
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
