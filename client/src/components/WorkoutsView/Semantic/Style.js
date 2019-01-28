import styled from "styled-components";

export const EditWorkoutSubmitForm = styled.form`
  font-family: ${props => props.theme.roboto};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 250px;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 20px 10px;
`;

export const AddWorkoutSubmitForm = styled.form`
  font-family: ${props => props.theme.roboto};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 250px;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 20px 10px;
`;

export const StyledButton = styled.button`
  height: 40px;
  width: 100%;
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.5em;
  background-color: ${props => props.theme.primaryDark};
  border: none;
  border-radius: 6px;
  color: white;
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

export const ValueInput = styled.input`
  height: 30px;
  width: 80%;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
`;
