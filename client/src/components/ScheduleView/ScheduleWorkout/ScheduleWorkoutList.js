import React from "react";
import ListItem from "./ListItem";
import styled from "styled-components";

const ScheduleWorkoutListStyle = styled.div``;

class ScheduleWorkoutList extends React.Component {
  state = {};
  render() {
    return (
      <ScheduleWorkoutListStyle>
        Schedule Workout List
        <ListItem />
      </ScheduleWorkoutListStyle>
    );
  }
}

export default ScheduleWorkoutList;
