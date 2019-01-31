import React, { useState, useContext } from "react";
import { Store } from '../../index';
import styled from 'styled-components';
import * as firebase from 'firebase';
import axios from "axios";


const ExerciseDetails = props => {
  //update state using hook
  const { state, dispatch } = useContext(Store);

  const [status, setStatus] = useState(props.exercise.completed);

  const updateExercise = () => {
      const key = window.localStorage.getItem("login_token")
    axios
      .put(
        `https://fitmetrix.herokuapp.com/api/schedule/edit/exercise/${props.exercise.id}`, 
        {completed:!props.exercise.completed}, 
        {headers:{Authorization:key}}
      )
      .then(response => {
        const exercise = response.data;
        console.log("exercise in axios call: ", exercise);
        // DO NOT UPDATE WITH INCOMING EXERCISE 
        // JUST UPDATE THE VALUE ITSELF
        // TO DO ON MONDAY
        props.dispatch({
          type: "UPDATE_S_EXERCISE",
          payload: {
            eId: props.exercise.id,
            wID: Number(props.exercise.schedule_workout_id),
            exercise
          }
        });
      })
      .catch(err => {
          console.log(err)
      })
  };

const updateScheduledWorkout = async (e) => {
  console.log("update sched workout")
  setStatus(e.target.checked);
  const token = await firebase.auth().currentUser.getIdToken();
  console.log("status:", status)
  console.log("completed:", props.exercise.completed)
  // if (status !== props.exercise.completed) {
  //   console.log("updating scheduled workout")
  //   const newScheduleWorkouts = await axios.get('https://fitmetrix.herokuapp.com/api/schedule', {
  //     headers: {
  //       Authorization: token
  //     }
  //   });

  //   dispatch({
  //     type: 'UPDATE_SCHEDULE_WORKOUTS',
  //     payload: newScheduleWorkouts.data
  //   });
  // }
}

  return (
    <ExerciseDetailsDiv key={props.exercise.id}>
      <ExerciseDetailsP> {props.exercise.name}</ExerciseDetailsP>
      <ExerciseDetailsP>Weight: {props.exercise.weight}</ExerciseDetailsP>
      <ExerciseDetailsP>Sets: {props.exercise.sets}</ExerciseDetailsP>
      <ExerciseDetailsP>Reps: {props.exercise.reps}</ExerciseDetailsP>
      <ExerciseDetailsListDiv>
      <p>Done</p>
      <input
        type="checkbox"
        checked={status}
        onChange={e => {
           
            updateScheduledWorkout( e)
        } }
      />
      </ExerciseDetailsListDiv>
    </ExerciseDetailsDiv>
  );
};

export default ExerciseDetails;

const ExerciseDetailsDiv = styled.div`
display:flex;
border-bottom:1px solid #eee;
align-items:center;
justify-content:space-around;

`;

const ExerciseDetailsP= styled.p`
width: calc(100%/5)`;
const ExerciseDetailsListDiv= styled.div`
display:flex;
align-items:center;
width: calc(100%/5)`;
