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
  setStatus(e.target.checked);
  const token = await firebase.auth().currentUser.getIdToken();
}
  return (
    <ExerciseDetailsDiv key={props.exercise.id}>
      <ExerciseDetailsP className='name'> {props.exercise.name}</ExerciseDetailsP>
      <ExerciseDetailsListDiv>
      <ExerciseDetailsP>Weight: {props.exercise.weight}</ExerciseDetailsP>
      <ExerciseDetailsP>Sets: {props.exercise.sets}</ExerciseDetailsP>
      <ExerciseDetailsP>Reps: {props.exercise.reps}</ExerciseDetailsP>
      <ExerciseDetailsP>
      <span>Done</span>
      <input
        type="checkbox"
        checked={status}
        onChange={e => {
            updateScheduledWorkout(e)
        } }
      />
      </ExerciseDetailsP>
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
height:60px;
h3 {
  width: calc(100%/5)
}
`;

const ExerciseDetailsP= styled.p`
  font-weight: 600;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const ExerciseDetailsListDiv= styled.div`
display:flex;
align-items:center;
justify-content: space-around;
width: 60%;

.name {
  font-weight:bold;
}
span {
  margin-right:15px;
  margin-bottom: 1em;
}

input {
   zoom: 1.5;
   margin-bottom: .5em;

   }
`;
