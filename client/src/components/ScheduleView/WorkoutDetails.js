import React, { useState } from "react";
import ExerciseDetails from "./ExerciseDetails";
import styled from "styled-components";

const WorkoutDetails = props => {
  const dateStringParser = date => {
    
    date = date.split("T")[0].split('-');

    const newDate = date[0] + "/" + date[1] + "/" + date[2];

    return new Date(newDate);

  };

  const dateFormat = d => {
    let month = d.getMonth() + 1;
    let day = d.getDate();
  
    if (day < 10) {
      day = '0' + day;
    }
  
    if (month < 10) {
      month = '0' + month;
    }
  
    return `${d.getFullYear()}-${month}-${day}`
  };
  
  return (
    <div>

 
      {props.scheduleWorkouts &&
        props.scheduleWorkouts.map(scheduleWorkout => {
          if (dateFormat(dateStringParser(scheduleWorkout.date)) === dateFormat(props.selectedDate)) {
            return (
              <WorkoutDetailsDiv key={scheduleWorkout.id}>
                <p>      WorkoutDetails</p>
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
              </WorkoutDetailsDiv>
            );
          }
        })}
       </div>
  );
};

export default WorkoutDetails;

const WorkoutDetailsDiv = styled.div`
`;