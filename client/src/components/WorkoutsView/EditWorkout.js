import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import CategoryDropDown from './AddEditWorkout/CategoryDropDown';
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
  const [exercises, setExercises] = useState([]);

  //useState hooks to set the Category that was chosen
  const [category, setCategory] = useState('default');
  const [addCategory, setAddCategory] = useState('');

  // hook to set the workouts to add
  const [workout, setWorkout] = useState(initialWorkoutValue);


  useEffect(
    () => {
      const editWorkout = state.editWorkout;
      if (editWorkout !== null) {
        setTitle(state.editWorkout.title);
        setExercises(state.editWorkout.exercises);
        setCategory(state.editWorkout.id)
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
    setCategory('default');
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
      `https://fitmetrix.herokuapp.com/api/workouts/edit/${state.editWorkout.id}`,
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

    if (res.status === 200) {
      const nWorkouts = await axios.get('https://fitmetrix.herokuapp.com/api/workouts/', {
        headers: {
          Authorization: token
        }
      });

      dispatch({
        type: 'UPDATE_WORKOUTS',
        payload: nWorkouts.data
      });

      dispatch({ type: 'RESET_EDIT_WORKOUT' });
      setTitle('');
      setExercises([]);
      setCategory('default');
    }
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
          user_id: state.id
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
    <select onChange={e => setCategory(e.target.value)} value={category}>
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

  const renderForm = () => {
    if (state.editWorkout === null) {
      return (
        <div>
          {/* Dropdown component that displays the user's categories */}
          <CategoryDropDown />
          {/* Conditional that renders an input that allows you to add a category using a Hook */}
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
          <div>
            Hi in Add mode
            <AddWorkoutSubmitForm onSubmit={e => addWorkout(e)}>
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
                    return <div>{`${ex.name}: ${ex.weight}x${ex.sets}x${ex.reps}`}</div>;
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
                <ValueInput value={weight} type="text" placeholder="Weight" onChange={e => setWeight(e.target.value)} />
                <ValueInput value={sets} type="text" placeholder="Sets" onChange={e => setSets(e.target.value)} />

                <ValueInput value={reps} type="text" placeholder="Reps" onChange={e => setReps(e.target.value)} />
              </>

              <StyledButton onClick={e => addExercise(e)}>Add Exercise to Workout</StyledButton>
              {/* conditional for Submit button if no workouts exist */}
              {exercises.length > 0 ? <StyledButton>Submit Workout</StyledButton> : null}
            </AddWorkoutSubmitForm>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Dropdown component that displays the user's categories */}
        <div>{categoryComponent}</div>
        {/* Conditional that renders an input that allows you to add a category using a Hook */}
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
                return <div key={i}>{`${ex.name}: ${ex.weight}x${ex.sets}x${ex.reps}`}</div>;
              })}
          </div>

          <div>
            <ValueInput
              value={exerciseName}
              type="text"
              placeholder="Exercise Name"
              onChange={e => setExerciseName(e.target.value)}
            />
            <ValueInput value={weight} type="text" placeholder="Weight" onChange={e => setWeight(e.target.value)} />
            <ValueInput value={sets} type="text" placeholder="Sets" onChange={e => setSets(e.target.value)} />
            <ValueInput value={reps} type="text" placeholder="Reps" onChange={e => setReps(e.target.value)} />
          </div>

          <StyledButton onClick={e => addExercise(e)}>Add Exercise to Workout</StyledButton>

          {/* conditional for Submit button if no workouts exist */}
          {state.editWorkout.exercises.length > 0 ? (
            <StyledButton type="submit">Submit Edited Workout</StyledButton>
          ) : null}
        </EditWorkoutSubmitForm>
      </div>
    );
  };

  return renderForm();
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

const AddWorkoutSubmitForm = styled.form`
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
  width: 80%;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
`;
