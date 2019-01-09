import React from "react";
import WorkoutCategory from "./WorkoutCategory";
import styled from "styled-components";

const WorkoutCategoryListStyle = styled.div``;

const WorkoutCategoryList = () => {
  return (
    <WorkoutCategoryListStyle>
      <WorkoutCategory />
    </WorkoutCategoryListStyle>
  );
};

export default WorkoutCategoryList;
