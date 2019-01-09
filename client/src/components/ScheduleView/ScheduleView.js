import React from "react";
import SideNav from "../SideNav";
import Calendar from "./Calendar";
import ScheduleWorkoutList from "./ScheduleWorkout/ScheduleWorkoutList";
import AddWorkout from "./AddWorkout";
import WorkoutDetails from "./WorkoutDetails";
import styled from "styled-components";

const ScheduleViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
`;

class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScheduleViewStyle>
        <SideNav />
        <Calendar />
        <ScheduleWorkoutList />
        <AddWorkout />
        <WorkoutDetails />
      </ScheduleViewStyle>
    );
  }
}

export default ScheduleView;
