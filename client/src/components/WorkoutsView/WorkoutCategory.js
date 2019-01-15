import React from "react";
import WorkoutTitleList from "./WorkoutTitleList";
import styled from "styled-components";

const WorkoutCategoryStyle = styled.div``;

const WorkoutCategory = props => {
  return (
    <WorkoutCategoryStyle>
      {props.workoutObj && props.workoutObj.title}
      {props.workoutObj !== undefined
        ? props.workoutObj.exercises.map(exerciseObj => {
            console.log(exerciseObj);
            return (
              <WorkoutTitleList
                key={exerciseObj.id}
                exerciseObj={exerciseObj}
              />
            );
          })
        : null}
    </WorkoutCategoryStyle>
  );
};

export default WorkoutCategory;
