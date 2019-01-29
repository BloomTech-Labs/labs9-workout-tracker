import styled from "styled-components";

export const CancelButton = styled.button`
  width: 100%;
  height: 38px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.primaryDark};
  color: ${props => props.theme.primaryDark};
  background-color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
`;

export const DeleteButton = styled.button`
  width: 165px;
  height: 38px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.accent};
  background-color: ${props => props.theme.accent};
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

export const SubmitButton = styled.button`
  width: ${props => props.small ? "165px" : "100%"};
  height: 38px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.primaryDark};
  background-color: ${props => props.theme.primaryDark};
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

export const StyledError = styled.div`
  color: red;
  font-size: 16px;
  font-weight: 600;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.45);
  padding: 0px 15px;
  outline: none;
  font-size: 18px;
`;

export const ModuleActions = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
