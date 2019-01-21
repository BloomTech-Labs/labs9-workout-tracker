import React, { useState } from "react";
import ExerciseDetails from "./ExerciseDetails";
import styled from "styled-components";

const WorkoutDetails = props => {
  return (
    <div>

 
      WorkoutDetails
      {props.scheduleWorkouts &&
        props.scheduleWorkouts.map(scheduleWorkout => {
          return (
            <div key={scheduleWorkout.id}>
              <p>Scheduled Workout: {scheduleWorkout.title}</p>
              Exercises for workout:
              {scheduleWorkout.exercises &&
                scheduleWorkout.exercises.map(exercise => {
                  return (
                    <ExerciseDetails
                      dispatch={props.dispatch}
                      key={exercise.id}
                      exercise={exercise}
                    />
                  );
                })}
            </div>
          );
        })}
       </div>
  );
};

export default WorkoutDetails;