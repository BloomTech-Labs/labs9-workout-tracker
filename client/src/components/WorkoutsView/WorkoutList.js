import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../index';

const WorkoutListStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  font-size: 2em;
  font-weight: bold;
  color: ${props => props.theme.accent};
  background-color: ${props => props.theme.primary};
  margin-right: 25%;
  padding: 0 10px;
  border-radius: 6px;
`;

const WorkoutList = props => {
  const { state, dispatch } = useContext(Store);

  console.log('the workouts are: ', props.workouts);

  useEffect(() => {
    dispatch({ type: 'USER_MODEL' });
  }, []);

  const verifyEditWorkout = e => {
    console.log('Do you want to edit this workout?');
    return <butto>Do you want to edit this workout?</butto>;
  };

  return (
    <WorkoutListStyle>
      {props.workouts &&
        props.workouts.map(workout => {
          if (workout.category_id === props.cat.id) {
            console.log('match? true');
            return <p onClick={e => verifyEditWorkout(e)}>{workout.title}</p>;
          }
        })}
    </WorkoutListStyle>
  );
};

export default WorkoutList;
