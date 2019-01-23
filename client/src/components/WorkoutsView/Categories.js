import React, { useState, useEffect, useContext } from 'react';
import WorkoutList from './WorkoutList';
import styled from 'styled-components';
import { Store } from '../../index';

const CategoriesStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  font-size: 2em;
  font-weight: bold;
  color: ${props => props.theme.accent};
  background-color: ${props => props.theme.primary};
  margin-right: 25%;
  padding: 0 10px;
  border-radius: 6px;
`;

const Categories = props => {
  const { state, dispatch } = useContext(Store);
  console.log(state);

  return (
    <CategoriesStyle>
      {state.category &&
        state.category.map(cat => {
          return (
            <div>
              {cat.name}
              <WorkoutList cat={cat} workouts={state.workouts} />
            </div>
          );
        })}
    </CategoriesStyle>
  );
};

export default Categories;