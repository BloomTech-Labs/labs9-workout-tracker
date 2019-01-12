import React from "react";
import styled from "styled-components";

const EditWorkoutStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditWorkoutSubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EditWorkout = props => {
  return (
    <EditWorkoutStyle>
      <EditWorkoutSubmitForm>
        <input type="text" placeholder="title" />
        <button>Add Workout</button>
        <input type="text" placeholder="Workout Name" />
        <input type="text" placeholder="Weight" />
        <input type="text" placeholder="Sets" />
        <input type="text" placeholder="Reps" />

        <button>Submit</button>
      </EditWorkoutSubmitForm>
    </EditWorkoutStyle>
  );
};

export default EditWorkout;
