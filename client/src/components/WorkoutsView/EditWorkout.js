import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const EditWorkout = props => {
  const key = window.localStorage.getItem('login_token');

  const reqUrl = 'https://fitmetrix.herokuapp.com/api/category/user';

  //Sets first Category in the dropdown list
  const initialCategoryValue = [{ name: ' --- Select a Category --- ' }];

  //  Create variable to store workout
  let initialWorkoutValue = {
    category_id: null,
    title: '',
    exercises: []
  };

  let initialExercise = {
    name: '',
    weight: null,
    sets: null,
    reps: null
  };

  //Hook to set workout Title
  const [title, setTitle] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  //useState hooks to set the Category that was chosen
  const [categories, setCategory] = useState(initialCategoryValue);
  // //useState hooks to set the CategoryId that was chosen
  // const [categoryId, setCategoryId] = useState(initialCategoryId);
  // hook to set the workouts to add
  const [workout, setWorkout] = useState(initialWorkoutValue);
  //create category component variable to put in the dropdown.
  let categoryComponent = null;

  // useEffect to get Categories from the backend
  useEffect(() => {
    console.log('Inside effect 1');
    axios.get(reqUrl, { headers: { Authorization: key } }).then(
      result => (
        console.log('the result is: ', result.data),
        result.data.map(res => {
          console.log('the res is: ', res);
          initialCategoryValue.push(res);
          console.log('initialCategoryValue:', initialCategoryValue);
          return setCategory(initialCategoryValue);
        })
      )
    );
  }, []);

  // // useEffect to set category ID on initialWorkoutValue
  // useEffect(() => {
  //   console.log('Inside effect 2');
  //   // return setCategoryId(ca tegoryId);
  // }, []);

  // method to handle selecting a category from dropdown
  const categorySelectionHandler = event => {
    let value = event.target.value;
    const categoryIndex = categories.filter(category => {
      if (category.name === value) console.log('match!', category.id);

      return category.name === value;
    });
    workout.category_id = categoryIndex[0].id;
    console.log(workout);
  };

  //add Exercise handler
  const addExercise = async (e, id) => {
    console.log('the current initialWorkoutValue is: ', workout);
    console.log('incoming id is: ', id);
    e.preventDefault();
    const token = window.localStorage.getItem('login_token');

    workout.category_id = id;
    initialExercise.name = exerciseName;
    initialExercise.weight = Number(weight);
    initialExercise.sets = Number(sets);
    initialExercise.reps = Number(reps);

    if (token !== undefined) {
      workout.exercises.push(initialExercise);
      console.log('the current workout is: ', workout);
      setExerciseName('');
      setWeight('');
      setSets('');
      setReps('');
    }
  };

  // add workout handler to add workout to database
  const addWorkout = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem('login_token');

    workout.title = title;
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
    setTitle('');
    setCategory('');
  };

  //Puts the categories into a component
  categoryComponent = (
    <select
      onChange={e => {
        categorySelectionHandler(e);
      }}
      value={categories}
    >
      {categories.map((category, index) => (
        <option value={category.id} key={index}>
          {category.name}
        </option>
      ))}
    </select>
  );

  return (
    <EditWorkoutSubmitForm onSubmit={e => addWorkout(e)}>
      <ValueInput value={title} type="text" placeholder="Workout Title" onChange={e => setTitle(e.target.value)} />
      <div>{categoryComponent}</div>
      <ValueInput
        value={exerciseName}
        type="text"
        placeholder="Exercise Name"
        onChange={e => setExerciseName(e.target.value)}
      />
      <ValueInput value={weight} type="text" placeholder="Weight" onChange={e => setWeight(e.target.value)} />
      <ValueInput value={sets} type="text" placeholder="Sets" onChange={e => setSets(e.target.value)} />
      <ValueInput value={reps} type="text" placeholder="Reps" onChange={e => setReps(e.target.value)} />
      <StyledButton onClick={e => addExercise(e, workout.category_id)}>Add Exercise</StyledButton>

      <StyledButton>Submit</StyledButton>
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
