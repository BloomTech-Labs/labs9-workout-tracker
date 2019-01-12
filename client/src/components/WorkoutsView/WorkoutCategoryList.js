import React from "react";
import WorkoutCategory from "./WorkoutCategory";
import styled from "styled-components";

const WorkoutCategoryListStyle = styled.div``;

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
