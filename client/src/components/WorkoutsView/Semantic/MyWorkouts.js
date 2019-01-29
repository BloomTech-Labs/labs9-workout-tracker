import React, { useContext, useState } from 'react';
import { Store } from '../../../index';
import firebase from 'firebase';
import styled from 'styled-components';
import DropDown from '../../../shared/DropDown';
import axios from 'axios';

const MyWorkouts = () => {
  //Accesses state and dispatch with the useContext Hook.
  const { state, dispatch } = useContext(Store);

  const getOptions = () => {
    let options = state.category.map((cat, i) => {
      return {
        name: cat.name,
        value: cat.id,
        key: cat.id
      };
    });

    options.unshift({
      name: 'All',
      value: 'all',
      key: 'all'
    });

    return options;
  };

  const handleChange = value => {
    dispatch({
      type: 'UPDATE_SELECTED_WORKOUTS_CATEGORY',
      payload: value
    });
  };

  const handleDelete = async (workoutID, i) => {
    console.log('In handleDelete');
    console.log('index is: ', workoutID);

    const newWorkouts = state.workouts;
    console.log('before splice newWorkouts are:', newWorkouts);

    newWorkouts.splice(i, 1);

    console.log('after splice newWorkouts are:', newWorkouts);

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
    //Resets the title and category after workout is added
  };

  return (
    <HeaderContainer>
      <Header>
        <DropDownContianer>
          <h2>My Workouts</h2>
          <DropDown
            label={'Filter by Category'}
            options={getOptions()}
            onChange={handleChange}
            value={state.selectedWorkoutCategory}
          />
        </DropDownContianer>
        <AddWorkoutButton type="button">Add Workout</AddWorkoutButton>
      </Header>
      {state.workouts.map((workout, i) => {
        if (state.selectedWorkoutCategory === 'all') {
          return (
            <Workout key={i}>
              <h3>{workout.title}</h3>
              <div>
                <span>
                  <i className="fas fa-pen" />
                </span>
                <span onClick={() => handleDelete(workout.id, i)}>
                  <i className="fas fa-times" />
                </span>
              </div>
            </Workout>
          );
        }
        if (workout.category_id == state.selectedWorkoutCategory) {
          return (
            <Workout key={i}>
              <h3>{workout.title}</h3>
              <div>
                <span>
                  <i className="fas fa-pen" />
                </span>
                <span onClick={() => handleDelete(workout.id, i)}>
                  <i className="fas fa-times" />
                </span>
              </div>
            </Workout>
          );
        }
        return null;
      })}
    </HeaderContainer>
  );
};

export default MyWorkouts;

const AddWorkoutButton = styled.button`
  height: 36px;
  width: 150px;
  background-color: ${props => props.theme.accent};
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DropDownContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

const Workout = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f4f8;
  margin-bottom: 20px;
  padding: 0px 16px;
  border-radius: 8px;
  h3 {
    margin: 0px;
  }
  span {
    margin-left: 20px;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
`;
