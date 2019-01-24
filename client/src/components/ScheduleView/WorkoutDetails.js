import React, { useState } from "react";
import ExerciseDetails from "./ExerciseDetails";
import axios from 'axios';
import styled from "styled-components";
import firebase from 'firebase';

const WorkoutDetails = props => {

  

  const dateStringParser = date => {
    if (date.length === 10) {
      return date
    }
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
  

 const unscheduleWorkout = async (e, scheduleWorkout) => {
   e.preventDefault();
   console.log(scheduleWorkout)
   const token = await firebase.auth().currentUser.getIdToken()
   const deleteRes = await axios.delete(
    `https://fitmetrix.herokuapp.com/api/schedule/delete/${scheduleWorkout.id}`,
    {
        headers: {
          Authorization: token
        }
    }
)
    .catch(err => console.log(err));
 }
 

  return (
    <div>

 
      {props.scheduleWorkouts &&
        props.scheduleWorkouts.map(scheduleWorkout => {
          if (dateFormat(dateStringParser(scheduleWorkout.date)) === dateFormat(props.selectedDate)) {
            return (
              <WorkoutDetailsDiv key={scheduleWorkout.id}>
                <p>      WorkoutDetails</p>
                <p>Scheduled Workout: {scheduleWorkout.title}</p>
                <button onClick={(e) => unscheduleWorkout(e, scheduleWorkout)}>Unschedule</button>
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