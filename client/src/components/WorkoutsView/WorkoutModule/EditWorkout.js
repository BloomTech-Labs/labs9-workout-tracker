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
  const [deleteArray, setDeleteArray] = useState([]);

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const editWorkout = state.editWorkout;
    if (editWorkout !== null) {
      setTitle(editWorkout.title);
      setExercises(editWorkout.exercises);
      dispatch({
        type: 'UPDATE_SELECTED_CATEGORY',
        payload: editWorkout.category_id
      });
    }
  }, [state.editWorkout]);

  //add Exercise handler
  const addExercise = async e => {
    e.preventDefault();

    let nExercise = {
      name: exerciseName,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
      workout_id: state.editWorkout.id
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


    if (token !== undefined) {

      if (deleteArray.length) {
        for (const ex of deleteArray) {
          const delRes = await axios.delete(
            `https://fitmetrix.herokuapp.com/api/workouts/exercise/delete/${ex.id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token
              }
            }
          );
        }
      }

      const res = await axios.put(
        `https://fitmetrix.herokuapp.com/api/workouts/edit`,
        editedWorkout,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );

      if(res.status === 200) {
        const newWorkouts = await axios.get('https://fitmetrix.herokuapp.com/api/workouts/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        });
        dispatch({ type: 'UPDATE_WORKOUTS', payload: newWorkouts.data });
      }
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

  const handleDelete = async e => {
    console.log('are you sure?');
    if (confirmDelete === false) {
      setConfirmDelete(true);
      return;
    }

    console.log('trying to delete: state.editWorkout.id', state.editWorkout.id);

    const deleteID = state.editWorkout.id;

    const newWorkouts = state.workouts;

    newWorkouts.splice(deleteID, 1);

    const token = await firebase.auth().currentUser.getIdToken();

    if (token !== undefined) {
      const res = await axios.delete(`https://fitmetrix.herokuapp.com/api/workouts/delete/${deleteID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      console.log('the res is: ', res);

      if (res.status === 200) {
        const newWorkouts = await axios.get('https://fitmetrix.herokuapp.com/api/workouts/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        });

        console.log('newWorkouts.data: ', newWorkouts.data);
        if (Array.isArray(newWorkouts.data)) {
          dispatch({ type: 'UPDATE_WORKOUTS', payload: newWorkouts.data });
        } else {
          dispatch({ type: 'UPDATE_WORKOUTS', payload: [] });
        }
      } else {
        console.log('error deleting');
      }
    }

    dispatch({ type: 'SHOW_WORKOUT_FORM' });
  };

  const removeExercise = async (e, index, exercise) => {

    const newExercises = exercises;

    if (exercise.id) {
      setDeleteArray([...deleteArray, exercise])
    }

    if (!isNaN(index)) {
      newExercises.splice(index, 1);
      setExercises(newExercises);
      console.log('exercises are: ', exercises);
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

      <TitleRow>
        <Row>
          <Input
            value={title}
            placeholder="Legs"
            onChange={e => setTitle(e.target.value)}
            size="large"
            label="Workout Title"
          />
        </Row>
        <CategoryDropdownContainer>
          <CategoryDropDown />
        </CategoryDropdownContainer>
      </TitleRow>

      {/* Conditional that renders the exercises that have been added to the workout that is being created */}

      {exercises &&
        exercises.map((ex, index) => {
          return (
            <WorkoutRow>
              <ExerciseTitleRow>
                <Input
                  name="name"
                  value={ex.name}
                  placeholder="Exercise Name"
                  onChange={e => inputOnChange(e, index)}
                  label="Exercise Name"
                  size="large"
                />
              </ExerciseTitleRow>
              <ExerciseRow>
                <Input
                  name="weight"
                  onChange={e => inputOnChange(e, index)}
                  value={ex.weight}
                  placeholder="Weight"
                  label="Weight"
                  size="small"
                />
                <Input
                  name="sets"
                  onChange={e => inputOnChange(e, index)}
                  value={ex.sets}
                  placeholder="Sets"
                  label="Sets"
                  size="small"
                />
                <Input
                  name="reps"
                  onChange={e => inputOnChange(e, index)}
                  value={ex.reps}
                  placeholder="Reps"
                  label="Reps"
                  size="small"
                />
                <i onClick={e => removeExercise(e, index, ex)} className="fas fa-times" />
              </ExerciseRow>
            </WorkoutRow>
          );
        })}
      <Row>
        <Button type="button" size="responsive" scheme="delete" onClick={e => addExercise(e)}>
          Add Exercise to Workout
        </Button>
      </Row>

      <Row>
        <Button type="submit" size="responsive">
          Update Workout
        </Button>
      </Row>
    </FormModal>
  );
};

export default EditWorkout;

const Row = styled.div`
  height: 62px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const CategoryRow = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 670px) {
    margin-top: 10px;
    /* border: solid purple; */
  }
`;

const ExerciseRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: 22px;
  }
  @media (max-width: 670px) {
    justify-content: space-between;
    padding: 0px;
    padding-top: 10px;
  }
`;
const WorkoutRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  /* border: solid green; */
  @media (max-width: 670px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px;
    margin-top: 10px;
    /* border: solid purple; */
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 670px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ExerciseTitleRow = styled.div`
  width: 100%;
`;

const CategoryDropdownContainer = styled.div`
  @media (max-width: 670px) {
    width: 100%;
    padding: 10px 0px;
  }
`;

