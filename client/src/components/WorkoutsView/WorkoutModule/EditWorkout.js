import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../../../index';
import axios from 'axios';
import * as firebase from 'firebase';
import styled from 'styled-components';
import CategoryDropDown from '../CategoryDropDown';
import Input from '../../../shared/Input';
import FormModal from '../../../shared/FormModal';
import { StyledError, DeleteButton } from '../../ProgressView/MetricModule/Style';
import Button from '../../../shared/Button';

const EditWorkout = () => {
  //Accesses state and dispatch with the useContext Hook.
  const { state, dispatch } = useContext(Store);

  //Hook to set workout Title
  const [title, setTitle] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [exercises, setExercises] = useState([]);

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(
    () => {
      const editWorkout = state.editWorkout;
      if (editWorkout !== null) {
        setTitle(editWorkout.title);
        setExercises(editWorkout.exercises);
        dispatch({ type: 'UPDATE_SELECTED_CATEGORY', payload: editWorkout.category_id });
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
    setExerciseName('');
    setWeight('');
    setSets('');
    setReps('');
  };

  // add new workout handler to add workout to database
  const editWorkout = async e => {
    e.preventDefault();

    const token = await firebase.auth().currentUser.getIdToken();

    //Sets the workout title and category id and sends a POST request to the backend to add the created workout

    const editedWorkout = {
      title,
      exercises,
      category_id: Number(state.selectedCategory),
      id: state.editWorkout.id
    };

    console.log('editedWorkout: ', editedWorkout);

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
      console.log('res: ', res);
      // console.log('the current editedWorkout is: ', editedWorkout);
    }
    //Resets the title and category after workout is added
    setTitle('');
    setExercises([]);
    dispatch({ type: 'SHOW_WORKOUT_FORM' });
  };

  const inputOnChange = async (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    const exerciseCopy = exercises;

    exerciseCopy[index][name] = value;

    setExercises(exerciseCopy);
  };

  const handleDelete = async (workoutID, i) => {
    if (confirmDelete === false) {
      setConfirmDelete(true);
      return;
    }

    const newWorkouts = state.workouts;

    newWorkouts.splice(i, 1);

    const token = await firebase.auth().currentUser.getIdToken();

    if (token !== undefined) {
      const res = await axios.delete(`https://fitmetrix.herokuapp.com/api/workouts/delete/${workoutID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      console.log('the res is: ', res);

      if (res.status === 200) {
        dispatch({
          type: 'UPDATE_WORKOUTS',
          payload: newWorkouts
        });
      } else {
        console.log('error deleting');
      }
    }
  };

  return (
    <FormModal
      onSubmit={e => editWorkout(e)}
      closeModal={() => dispatch({ type: 'SHOW_WORKOUT_FORM' })}
      title={'Edit a Workout'}
    >
      <Button type="button" scheme="delete" size="responsive" onClick={e => handleDelete(e)}>
        {confirmDelete ? 'Click to confirm' : 'Delete'}
      </Button>

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
        <AddExerciseButton type="button" onClick={e => addExercise(e)}>
          Add Exercise to Workout
        </AddExerciseButton>
      </Row>

      <Row>
        <SubmitButton type="submit">Update Workout</SubmitButton>
      </Row>
    </FormModal>
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
