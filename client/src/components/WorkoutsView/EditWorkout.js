import React from "react";
import styled from "styled-components";

const EditWorkoutStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditWorkoutSubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const EditWorkout = props => {
  return (
    <EditWorkoutStyle>
      <EditWorkoutSubmitForm>
        <input type="text" placeholder="title" />

        <button>Submit</button>
      </EditWorkoutSubmitForm>
    </EditWorkoutStyle>
  );
};

export default EditWorkout;
