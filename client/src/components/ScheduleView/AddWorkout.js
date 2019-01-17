import React from "react";
import styled from "styled-components";


const AddWorkout = (props) => {
  return <AddWorkoutStyle>
    <form>
      <div>{
        props.workouts && props.workouts.map(workout => {
          return (
            <div>
              <p key={workout.id}>Add workout COMPONENT </p>
              <p>Workout Category:{workout.category.name}</p>
              <p>Workout Title:{workout.title}</p>
            </div>
          )
        })}</div>
    </form>
    </AddWorkoutStyle>;
};




const AddWorkoutStyle = styled.div`
border:1px solid purple`;
export default AddWorkout;
