import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const AddWorkout = props => {
  const key = window.localStorage.getItem('login_token');
  const reqUrl = 'https://fitmetrix.herokuapp.com/api/category/user';

  const initialCategoryValue = [{ id: null, name: ' --- Select a Category --- ' }];
  const [categories, setCategory] = useState(initialCategoryValue);
  const [categoryID, setCategoryID] = useState(null)

//create category component variable to put in the dropdown.
let categoryComponent = null;

// useEffect to get Categories from the backend
useEffect(() => {
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

  // method to handle selecting a category from dropdown
  const categorySelectionHandler = event => {
    let value = event.target.value;
    console.log('value', value)
    console.log('categories', categories)
    const categoryIndex = categories.filter(category => {
      return category.id === Number(value);
    });
    setCategoryID(categoryIndex[0].id)
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
    <AddWorkoutStyle>
      <form>
        <div>
        <div>{categoryComponent}</div>
           {props.workouts &&
            props.workouts.map( workout => {
              console.log('map workout:', workout)
              console.log('map categoryID:', categoryID)
              if (workout.id === categoryID) {
                return (
                  <div>{workout.title}</div>
                )
              }
            })
            } 
        </div>
      </form>
    </AddWorkoutStyle>
  );
};

const AddWorkoutStyle = styled.div`
  border: 1px solid purple;
`;
export default AddWorkout;
