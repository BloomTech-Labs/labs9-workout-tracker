import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../../index';
import firebase from 'firebase';
import styled from 'styled-components';
import DropDown from '../../shared/DropDown';
import Button from '../../shared/Button';
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

  const handleAdd = e => {
    console.log('in handleAdd');
    dispatch({ type: 'RESET_EDIT_WORKOUT' });

    dispatch({
      type: 'SHOW_WORKOUT_FORM',
      payload: true
    });
  };

  const handleEdit = async (workoutID, i) => {
    console.log('in handleEdit');

    dispatch({
      type: 'SHOW_WORKOUT_FORM',
      payload: true
    });

    dispatch({
      type: 'EDIT_WORKOUT',
      payload: state.workouts[i]
    });
  };

  return (
    <HeaderContainer>
      <Header>
        <DropDownContainer>
          <h1>My Workouts</h1>
          <DropDown
            label={'Filter by Category'}
            options={getOptions()}
            onChange={handleChange}
            value={state.selectedWorkoutCategory}
          />
        </DropDownContainer>
        <ButtonContainer>
          <Button onClick={() => handleAdd()} type="button">
            Add Workout
          </Button>
        </ButtonContainer>
      </Header>
      {state.workouts.map((workout, i) => {
        if (state.selectedWorkoutCategory === 'all') {
          return (
            <Workout key={i}>
              <h3>{workout.title}</h3>
              <div>
                <span>
                  <i onClick={() => handleEdit(workout.id, i)} className="fas fa-edit" />
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
                  <i onClick={() => handleEdit(workout.id, i)} className="fas fa-edit" />
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

// const AddWorkoutButton = styled.button`
//   height: 36px;
//   width: 150px;
//   background-color: ${props => props.theme.accent};
//   border: none;
//   border-radius: 4px;
//   color: white;
//   cursor: pointer;
// `;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 670px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: 670px) {
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
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
  @media (max-width: 670px) {
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  @media (max-width: 670px) {
  }
`;
