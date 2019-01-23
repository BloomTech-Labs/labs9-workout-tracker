import React, { useState } from "react";
import axios from "axios";

const ExerciseDetails = props => {
  //update state using hook
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

  return (
    <div key={props.exercise.id}>
      <input
        type="checkbox"
        checked={status}
        onChange={e => {
            setStatus(e.target.checked)
        } }
      />
      <p> {props.exercise.name}</p>
      <p>completed? {status.toString()}</p>
      <p>Weight: {props.exercise.weight}</p>
      <p>Sets: {props.exercise.sets}</p>
      <p>Reps: {props.exercise.reps}</p>
    </div>
  );
};

export default ExerciseDetails;
