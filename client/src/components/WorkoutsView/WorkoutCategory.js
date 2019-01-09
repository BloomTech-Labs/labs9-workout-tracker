import React from "react";
import WorkoutTitleList from "./WorkoutTitleList";
import styled from "styled-components";

const WorkoutCategoryStyle = styled.div``;

const WorkoutCategory = () => {
  return (
    <WorkoutCategoryStyle>
      <WorkoutTitleList />
    </WorkoutCategoryStyle>
  );
};

export default WorkoutCategory;
