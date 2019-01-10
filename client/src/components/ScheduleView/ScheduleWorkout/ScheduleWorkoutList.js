import React from "react";
import ListItem from "./ListItem";
import styled from "styled-components";

const ScheduleWorkoutListStyle = styled.div``;

const ScheduleWorkoutList = (props) => {
    return (
      <ScheduleWorkoutListStyle>
         {props.scheduleWorkouts.map(scheduleWorkout => {
           return (
             <ListItem key={scheduleWorkout.id} scheduleWorkout={scheduleWorkout}/>
           )
         })} 
      </ScheduleWorkoutListStyle>
    );
}

export default ScheduleWorkoutList;
