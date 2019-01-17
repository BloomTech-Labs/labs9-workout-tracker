import React from 'react';
import EditWorkout from './EditWorkout';
import Dropdown from './Dropdown';
import WorkoutCategoryList from './WorkoutCategoryList';
import styled from 'styled-components';

import bodybuilder from '../assets/bodybuilder.jpg';

const WorkoutsViewContainer = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 500px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background: no-repeat center center fixed;
  background-image: url(${bodybuilder});
  background-size: cover;
`;

const WorkoutsViewStyle = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  position: absolute;
  top: 74px;
  justify-content: space-between;
`;

const WorkoutsView = props => {
  return (
    <WorkoutsViewContainer>
      <WorkoutsViewStyle>
        <EditWorkout workouts={props.workouts} />
        <WorkoutCategoryList workouts={props.workouts} />
      </WorkoutsViewStyle>
    </WorkoutsViewContainer>
  );
};

export default WorkoutsView;
