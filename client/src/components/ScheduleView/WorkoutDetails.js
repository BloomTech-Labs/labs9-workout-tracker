import React from "react";
import styled from "styled-components";


const WorkoutDetails = (props) => {
  return <WorkoutDetailsStyle>
    WorkoutDetails
    {props.scheduleWorkouts.map(scheduleWorkout => {
    return (
      <div>
        <p>{scheduleWorkout.category.name}</p>
        {scheduleWorkout.exercises.map(exercise => {
          return (
            <p>{exercise.name}</p>
          )
        })}
      </div>
    )
  })}</WorkoutDetailsStyle>;
};

const WorkoutDetailsStyle = styled.div``;

export default WorkoutDetails;
