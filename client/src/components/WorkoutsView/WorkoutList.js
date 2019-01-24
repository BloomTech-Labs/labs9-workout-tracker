import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Store } from '../../index';

const WorkoutList = props => {

  const {state, dispatch} = useContext(Store)
  console.log(state);

  useEffect(() => {
    dispatch({type: "CONTEXT_TEST"})
  }, [])
  return (
    <WorkoutListStyle>
      hi
    </WorkoutListStyle>
  );
};

export default WorkoutList;

const WorkoutListStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  font-size: 2em;
  font-weight: bold;
  color: white;
  background-color: ${props => props.theme.primary};
  margin-right: 25%;
  padding: 0 10px;
  border-radius: 6px;
`;