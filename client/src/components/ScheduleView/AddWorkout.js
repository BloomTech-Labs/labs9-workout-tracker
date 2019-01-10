import React from "react";
import styled from "styled-components";


const AddWorkout = (props) => {
  return <AddWorkoutStyle>
    <form>
      <div>{props.workouts.map(workout => {
        return (
          <p>Add workout {workout.category.name}</p>
        )
      })}</div>
    </form>
    </AddWorkoutStyle>;
};




const AddWorkoutStyle = styled.div`
border:1px solid purple`;
export default AddWorkout;
