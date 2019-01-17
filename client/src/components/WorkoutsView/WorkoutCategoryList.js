import React from "react";
import WorkoutCategory from "./WorkoutCategory";
import styled from "styled-components";

const WorkoutCategoryListStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  font-size: 2em;
  font-weight: bold;
  color: ${props => props.theme.accent};
  background-color: ${props => props.theme.primary};
  margin-right: 25%;
  padding: 0 10px;
  border-radius: 6px;
`;

const WorkoutCategoryList = props => {
  return (
    <WorkoutCategoryListStyle>
      {props.workouts !== undefined
        ? props.workouts.map(workoutObj => {
            console.log(workoutObj);
            return (
              <WorkoutCategory key={workoutObj.id} workoutObj={workoutObj} />
            );
          })
        : null}
    </WorkoutCategoryListStyle>
  );
};

export default WorkoutCategoryList;
