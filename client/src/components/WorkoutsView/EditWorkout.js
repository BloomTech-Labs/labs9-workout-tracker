import React from 'react';
import styled from 'styled-components';

const EditWorkoutStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  display: flex;
  flex-direction: column;
  margin-left: 25%;
  background-color: ${props => props.theme.primary};
  width: 175px;
`;

const EditWorkoutSubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  font-family: ${props => props.theme.roboto};
  height: 30px;
  width: 145px;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: ${props => props.theme.themeWhite};
`;

const StyledButton = styled.button`
  height: 40px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: ${props => props.theme.roboto};
  font-weight: bold;
  font-size: 1.5em;
  background-color: ${props => props.theme.primaryLight};
  border-radius: 6px;
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const ValueInput = styled.input`
  font-family: ${props => props.theme.roboto};
  height: 30px;
  width: 145px;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: ${props => props.theme.themeWhite};
`;

const EditWorkout = props => {
  return (
    <EditWorkoutStyle>
      <EditWorkoutSubmitForm>
        <TitleInput type="text" placeholder="Workout Title" />

        <ValueInput type="text" placeholder="Exercise Name" />
        <ValueInput type="text" placeholder="Weight" />
        <ValueInput type="text" placeholder="Sets" />
        <ValueInput type="text" placeholder="Reps" />
        <StyledButton>Add Exercise</StyledButton>

        <StyledButton>Submit</StyledButton>
      </EditWorkoutSubmitForm>
    </EditWorkoutStyle>
  );
};

export default EditWorkout;
