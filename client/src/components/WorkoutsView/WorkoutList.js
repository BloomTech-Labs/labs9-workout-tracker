import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../index';

const WorkoutListStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.accent};
  background-color: ${props => props.theme.primary};
  text-align: center;
  padding: 0 10px;
  border-radius: 6px;
`;

const WorkoutList = props => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {}, []);

  const verifyEditWorkout = workout => {
    console.log('Do you want to edit this workout?');

    dispatch({ type: 'EDIT_WORKOUT', payload: workout });
  };

  return (
    <WorkoutListStyle>
      {state.workouts &&
        state.workouts.map(workout => {
          if (workout.category_id === props.cat.id) {
            console.log('match? true');
            return <p onClick={() => verifyEditWorkout(workout)}>{workout.title}</p>;
          }
        })}
    </WorkoutListStyle>
  );
};

export default WorkoutList;
