import React, { useState, useContext } from "react";
import { Store } from "../../index";
import styled from "styled-components";
import * as firebase from "firebase";
import axios from "axios";

const ExerciseDetails = props => {
  //update state using hook

  // const { state, dispatch } = useContext(Store);

  const [status, setStatus] = useState(props.exercise.completed);

  const updateExercise = () => {
    const key = window.localStorage.getItem("login_token");
    axios
      .put(
        `https://fitmetrix.herokuapp.com/api/schedule/edit/exercise/${
          props.exercise.id
        }`,
        { completed: !props.exercise.completed },
        { headers: { Authorization: key } }
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
        console.log(err);
      });
  };

  const updateScheduledWorkout = async e => {
    setStatus(e.target.checked);
    const token = await firebase.auth().currentUser.getIdToken();
  };
  return (
    <ExDetailsTitle key={props.exercise.id}>
      <ExerciseDetailsP> {props.exercise.name}</ExerciseDetailsP>
      <ExDetailsP>{props.exercise.weight}</ExDetailsP>
      <ExDetailsP>{props.exercise.sets}</ExDetailsP>
      <ExDetailsP>{props.exercise.reps}</ExDetailsP>
      {/* <CheckboxContainer>
        <input
          type="checkbox"
          checked={status}
          onChange={e => {
              updateScheduledWorkout(e)
          } }
        />
      </CheckboxContainer> */}
    </ExDetailsTitle>
  );
};

export default ExerciseDetails;

const ExDetailsTitle = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  flex-wrap: wrap;
  font-weight: bold;
  align-items: center;
  h3 {
    width: calc(100% / 5);
  }
`;

const ExDetailsP = styled.p`
  width: 25%;
  font-size: 1.4rem;
  margin-bottom: 0px;
  text-align: center;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExerciseDetailsP = styled(ExDetailsP)`
text-align: initial;
`;

const CheckboxContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  width: 20%;
  input {
    zoom: 1.5;
  }
`;
