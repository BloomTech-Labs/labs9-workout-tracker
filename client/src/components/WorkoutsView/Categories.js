import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../index';

const Categories = () => {
  const { state, dispatch } = useContext(Store);

  const verifyEditWorkout = workout => {
    dispatch({ type: 'EDIT_WORKOUT', payload: workout });
  };

  return (
    <CategoriesStyle>
      {console.log(state)}
      {state.category &&
        state.category.map((category, i) => {
          return (
            <div key={i}>
              <p>{category.name}</p>
              <WorkoutListStyle>
                {state.workouts.map((w, j) => {
                  if (w.category_id === category.id) {
                    return (
                      <div key={`${i}${j}`} onClick={() => verifyEditWorkout(w)}>
                        {w.title}
                      </div>
                    );
                  }
                  return null;
                })}
              </WorkoutListStyle>
            </div>
          );
        })}
    </CategoriesStyle>
  );
};

export default Categories;

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

const CategoriesStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  font-size: 1.75rem;
  font-weight: bold;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary};
  margin-right: 25%;
  padding: 0 10px;
  border-radius: 6px;
`;
