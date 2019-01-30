import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../../../index';
import axios from 'axios';
import * as firebase from 'firebase';
import styled from 'styled-components';
import CategoryDropDown from './CategoryDropDown';
import Input from '../../../shared/Input';

const EditWorkout = () => {
  //Accesses state and dispatch with the useContext Hook.
  const { state, dispatch } = useContext(Store);

  const { category } = state;

  //Hook to set workout Title
  const [title, setTitle] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [exercises, setExercises] = useState([]);
  const [editWorkout, setEditWorkout] = useState(null);

  //A useState Hook to update the selected category on state.
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(
    () => {
      const editWorkout = state.editWorkout;
      if (editWorkout !== null) {
        setTitle(editWorkout.title);
        setExercises(editWorkout.exercises);
        dispatch({ type: 'UPDATE_SELECTED_CATEGORY', payload: editWorkout.category_id });
      } else {
        setTitle('');
      }
    },
    [state.editWorkout]
  );

  //Maps through the user's categories on state and returns the category names. Is used in the dropdown onChange.
  const categoryOptions = category.map(cate => {
    return {
      key: cate.id,
      text: cate.name,
      value: cate.id
    };
  });

  // const checkEditExists = () => {
  //   let editWorkoutTitle = '';
  //   if (editWorkout[0].length > 0) {
  //     let editWorkoutTitle = state.editWorkout[0].title;
  //   }
  //   const [title, setTitle] = useState(editWorkoutTitle);
  // };

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
    setExerciseName('');
    setWeight('');
    setSets('');
    setReps('');
  };

  // add new workout handler to add workout to database
  const EditWorkout = async e => {
    e.preventDefault();
    console.log('HELLO from EditWorkout');

    const token = await firebase.auth().currentUser.getIdToken();

    //Sets the workout title and category id and sends a POST request to the backend to add the created workout

    const editedWorkout = {
      title,
      exercises,
      category_id: Number(state.selectedCategory)
    };

    console.log('the state.editWorkout.id: ', state.editWorkout.id);

    console.log('the current editedWorkout is: ', editedWorkout);

    if (token !== undefined) {
      const res = await axios.put(
        `https://fitmetrix.herokuapp.com/api/workouts/edit/${state.editWorkout.id}`,
        editedWorkout,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );
      console.log('the res is: ', res);
      // console.log('the current editedWorkout is: ', editedWorkout);
    }
    //Resets the title and category after workout is added
    setTitle('');
    setSelectedCategory('default');
    setEditWorkout(null);
    setExercises([]);
  };

  const inputOnChange = async (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    const exerciseCopy = exercises;

    exerciseCopy[index][name] = value;

    setExercises(exerciseCopy);
  };

  return (
    <Container onSubmit={e => EditWorkout(e)}>
      <h2>Edit Workouts</h2>
      <Row>
        <Input
          value={title}
          placeholder="Legs"
          onChange={e => setTitle(e.target.value)}
          size="large"
          label="Workout Title"
        />
        <CategoryDropDown />
      </Row>

      {/* Conditional that renders the exercises that have been added to the workout that is being created */}

      {exercises &&
        exercises.map((ex, index) => {
          return (
            <Row>
              <Input
                name="name"
                value={ex.name}
                placeholder="Exercise Name"
                onChange={e => inputOnChange(e, index)}
                label="Exercise Name"
                size="large"
              />
              <Input
                name="weight"
                onChange={e => inputOnChange(e, index)}
                value={ex.weight}
                placeholder="Weight"
                label="Weight"
              />
              <Input
                name="sets"
                onChange={e => inputOnChange(e, index)}
                value={ex.sets}
                placeholder="Sets"
                label="Sets"
              />
              <Input
                name="reps"
                onChange={e => inputOnChange(e, index)}
                value={ex.reps}
                placeholder="Reps"
                label="Reps"
              />
              <span>x</span>
            </Row>
          );
        })}

      <Row>
        <Input
          value={exerciseName}
          placeholder="Lunges"
          onChange={e => setExerciseName(e.target.value)}
          label="Exercise Name"
          size="large"
        />
        <Input value={weight} type="text" placeholder="50" onChange={e => setWeight(e.target.value)} label="Weight" />
        <Input value={sets} type="text" placeholder="3" onChange={e => setSets(e.target.value)} label="Sets" />
        <Input value={reps} type="text" placeholder="12" onChange={e => setReps(e.target.value)} label="Reps" />
        <span>x</span>
      </Row>

      <Row>
        <AddExerciseButton type="button" onClick={e => addExercise(e)}>
          Add Exercise to Workout
        </AddExerciseButton>
      </Row>

      <Row>
        <SubmitButton type="submit">Update Workout</SubmitButton>
      </Row>
    </Container>
  );
};

export default EditWorkout;

const AddExerciseButton = styled.button`
  width: 100%;
  height: 36px;
  background-color: white;
  box-shadow: ${props => props.theme.boxShadow};
  border: none;
  border-radius: 4px;
  cursor: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 36px;
  color: white;
  background-color: ${props => props.theme.accent};
  border-radius: 4px;
  box-shadow: ${props => props.theme.boxShadow};
  border: none;
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
  height: 75px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
