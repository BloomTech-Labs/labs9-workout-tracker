import React from "react";
import styled from "styled-components";


const WorkoutDetails = (props) => {
  return <WorkoutDetailsStyle>
    WorkoutDetails

    {/* Mapping through schedule workouts to return the category, 
    then I needed to map through exercises as well to render each exercise from the exercise array.
    Another choice is to create another component after mapping through schedule workouts, 
    and mapping through the exercises array on that component -wd */}

    {props.scheduleWorkouts.map(scheduleWorkout => {
    return (
      <div key={scheduleWorkout.id}>
        
        <p>{scheduleWorkout.category.name}</p>
        {scheduleWorkout.exercises.map(exercise => {
          return (
            <p key={exercise.id}>{exercise.name}</p>
          )
        })}
      </div>
    )
  })}</WorkoutDetailsStyle>;
};

const WorkoutDetailsStyle = styled.div``;

export default WorkoutDetails;
