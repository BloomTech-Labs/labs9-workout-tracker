import React from "react";
import styled from "styled-components";
import axios from "axios";

const AddWorkout = props => {
  // const handleAdd = () => {
  //   const {category, workout} = req.body;
  //   axios.post(
  //     `https://fitmetrix.herokuapp.com/api/schedule/edit/exercise/${props.exercise.id}`
  //   )
  // }
  return (
    <AddWorkoutStyle>
      <form>
        <div>
          {props.workouts &&
            props.workouts.map(workout => {
              return (
                <div key={workout.id}>
                  <p>Add workout COMPONENT </p>
                  <p>Workout Category:{workout.category.name}</p>
                  <p>Workout Title:{workout.title}</p>
                </div>
              );
            })}
        </div>
      </form>
    </AddWorkoutStyle>
  );
};

const AddWorkoutStyle = styled.div`
  border: 1px solid purple;
`;
export default AddWorkout;
