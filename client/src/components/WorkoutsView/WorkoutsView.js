import React, { useState, useContext } from 'react';
import { Store } from '../../index';
import EditWorkout from './EditWorkout';
import Categories from './Categories';
import styled from 'styled-components';
import requireAuth from '../../requireAuth';

import bodybuilder from '../assets/bodybuilder.jpg';

const WorkoutsView = props => {
  const { state, dispatch } = useContext(Store);

  return (
    <WorkoutsViewContainer>
      <WorkoutsViewStyle>
        <EditWorkout user={state} />
        <Categories />
      </WorkoutsViewStyle>
    </WorkoutsViewContainer>
  );
};

export default requireAuth(WorkoutsView);

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
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 100px;
`;
