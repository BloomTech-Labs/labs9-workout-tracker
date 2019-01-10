import React from "react";
import SideNav from "../SideNav";
import Calendar from "./Calendar";
import ScheduleWorkoutList from "./ScheduleWorkout/ScheduleWorkoutList";
import AddWorkout from "./AddWorkout";
import WorkoutDetails from "./WorkoutDetails";
import styled from "styled-components";


const ScheduleView = (props) => {
  
  
  return (
    <ScheduleViewStyle>
        <SideNav />
        <Calendar />
        <ScheduleWorkoutList scheduleWorkouts={props.scheduleWorkouts}/>
        <AddWorkout workouts={props.workouts} scheduleWorkouts={props.scheduleWorkouts}/>
        <WorkoutDetails scheduleWorkouts={props.scheduleWorkouts}/>
      </ScheduleViewStyle>
    )
    
  }
  



  const ScheduleViewStyle = styled.div`
    width: 100%;
    max-width: 880px;
    display:flex;
  `;
  export default ScheduleView;
  