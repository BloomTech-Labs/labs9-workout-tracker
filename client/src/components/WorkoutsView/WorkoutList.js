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

  useEffect(() => {
    dispatch({ type: 'USER_MODEL' });
  }, []);
  return (
    <WorkoutListStyle>
      <div>
        WORKOUT CARD
        {state.workouts.map(workout => {
          if (workout.category_id === state.category.id) {
            console.log('match? true');
            return <p>{workout.title}</p>;
          }
        })}
      </div>
    </WorkoutListStyle>
  );
};

export default WorkoutList;