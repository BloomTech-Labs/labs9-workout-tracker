import React from 'react';
import requireAuth from '../../requireAuth';
import AddWorkouts from './AddWorkouts';
import MyWorkouts from './MyWorkouts';
import EditWorkout from './EditWorkout';
import styled from 'styled-components';

const WorkoutsView = props => {
  return (
    <Container>
      <MyWorkouts />
      <AddWorkouts />
      <EditWorkout />
    </Container>
  );
};

export default requireAuth(WorkoutsView);

const Container = styled.div`
  border: ${props => props.theme.primaryDark};
  width: 100%;
  max-width: 950px;
  padding: 0px 30px;
`;
