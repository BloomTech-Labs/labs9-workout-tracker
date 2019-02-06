import React, { useContext } from 'react';
import { Store } from '../../index';
import requireAuth from '../../requireAuth';
import MyWorkouts from './MyWorkouts';
import styled from 'styled-components';
import WorkoutModule from './WorkoutModule';

const WorkoutsView = props => {
  const { state, dispatch } = useContext(Store);

  return (
    <Container>
      <MyWorkouts />
      {state.showWorkoutForm ? <WorkoutModule /> : null}
    </Container>
  );
};

export default requireAuth(WorkoutsView);

const Container = styled.div`
  border: ${props => props.theme.primaryDark};
  width: 100%;
  max-width: 1040px;
  padding: 0px 30px;
`;
