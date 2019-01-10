import React from "react";
import SideNav from "../SideNav";
import EditWorkout from "./EditWorkout";
import WorkoutCategoryList from "./WorkoutCategoryList";
import styled from "styled-components";

const WorkoutsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
`;

const WorkoutsView = props => {
  return (
    <WorkoutsViewStyle>
      <SideNav />
      <EditWorkout workouts={props.workouts} />
      <WorkoutCategoryList workouts={props.workouts} />
    </WorkoutsViewStyle>
  );
};

export default WorkoutsView;
