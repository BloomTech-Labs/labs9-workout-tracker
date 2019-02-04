import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../../../index';
import axios from 'axios';
import * as firebase from 'firebase';
import styled from 'styled-components';
import CategoryDropDown from '../CategoryDropDown';
import Input from '../../../shared/Input';
import FormModal from '../../../shared/FormModal';
import Button from '../../../shared/Button';

const AddWorkout = () => {
  //Accesses state and dispatch with the useContext Hook.
  const { state, dispatch } = useContext(Store);

  const { category } = state;

  //A useState Hook to update the selected category on state.
  const [selectedCategory, setSelectedCategory] = useState('');

  //Maps through the user's categories on state and returns the category names. Is used in the dropdown onChange.
  const categoryOptions = category.map(cate => {
    return {
      key: cate.id,
      text: cate.name,
      value: cate.id
    };
  });

  //Hook to set workout Title
  const [title, setTitle] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [exercises, setExercises] = useState([
    {
      name: '',
      weight: '',
      sets: '',
      reps: ''
    }
  ]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const selectedWorkoutCategory = state.selectedWorkoutCategory;
    if (selectedWorkoutCategory === 'add') {
      dispatch({ type: 'ADDING_CATEGORY' });
    }
  }, [state.selectedWorkoutCategory]);

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
  const addNewWorkout = async e => {
    e.preventDefault();
    console.log('hello from addNewWorkout');
    const token = window.localStorage.getItem('login_token');
    console.log('the state.selectedCategory is: ', state.selectedCategory);

    //Sets the workout title and category id and sends a POST request to the backend to add the created workout

    const workout = {
      title,
      category_id: Number(state.selectedCategory),
      exercises
    };
    console.log('the current workout is: ', workout);

    if (token !== undefined) {
      const res = await axios.post('https://fitmetrix.herokuapp.com/api/workouts/', workout, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      console.log('the current workout is: ', workout);

      if (res.status === 201) {
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
    setSelectedCategory('default');
    dispatch({ type: 'SHOW_WORKOUT_FORM' });
  };

  const inputOnChange = async (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    const exerciseCopy = exercises;

    exerciseCopy[index][name] = value;

    setExercises(exerciseCopy);
  };

  const categoryOnChange = async e => {
    const value = e.target.value;
    setNewCategory(value);
  };

  const addNewCategory = async e => {
    e.preventDefault();
    console.log('event(e) is: ', e);

    const newCatObj = {
      name: newCategory
    };

    console.log('newCategory is: ', newCategory);
    const token = await firebase.auth().currentUser.getIdToken();

    const res = await axios.post('https://fitmetrix.herokuapp.com/api/category/create/', newCatObj, {
      headers: {
        Authorization: token
      }
    });

    dispatch({
      type: 'UPDATE_CATEGORIES',
      payload: newCategory
    });

    dispatch({ type: 'ADD_CATEGORY' });
  };

  const removeExercise = async (e, index) => {
    console.log('exercises length is:', exercises.length);
    console.log('exercises are:', exercises);
    console.log('index is:', index);

    const newExercises = exercises;

    if (!isNaN(index)) {
      newExercises.splice(index, 1);
      setExercises(newExercises);
      console.log('exercises are: ', exercises);
    }
  };

  return (
    <FormModal
      onSubmit={e => addNewWorkout(e)}
      closeModal={() => dispatch({ type: 'SHOW_WORKOUT_FORM' })}
      title={'Add a Workout'}
    >
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

      {/* Conditional that renders the category Input field when a user wants to add a category */}

      {state.selectedCategory === 'add' ? (
        <CategoryRow>
          <Input
            value={newCategory}
            placeholder="Arms #2"
            onChange={e => categoryOnChange(e)}
            label="New Category Name"
            size="large"
          />
          <Button size="category" onClick={e => addNewCategory(e)} type="button">
            Add Category
          </Button>
        </CategoryRow>
      ) : null}

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
                {exercises.length === 1 ? null : <i onClick={e => removeExercise(e, index)} className="fas fa-times" />}
              </ExerciseRow>
            </WorkoutRow>
          );
        })}

      <Row>
        <Button type="button" scheme="delete" size="responsive" onClick={e => addExercise(e)}>
          Add Exercise
        </Button>
      </Row>

      <Row>
        <Button type="submit" size="responsive">
          Submit
        </Button>
      </Row>
    </FormModal>
  );
};

export default AddWorkout;

const Row = styled.div`
  height: 75px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CategoryRow = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 550px) {
    margin-top: 10px;
    /* border: solid purple; */
  }
`;

const ExerciseRow = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 20px;
  /* border: solid purple; */
  @media (max-width: 550px) {
    justify-content: space-between;
    padding: 0px;
    padding-top: 10px;
  }
`;

const WorkoutRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 0px;
  /* border: solid green; */
  @media (max-width: 550px) {
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
  align-items: flex-end;
  @media (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ExerciseTitleRow = styled.div`
  /* border: solid red; */
  @media (max-width: 550px) {
  }
`;

const CategoryDropdownContainer = styled.div`
  padding: 0px 20px;
  @media (max-width: 550px) {
    padding: 10px 0px;
  }
`;
