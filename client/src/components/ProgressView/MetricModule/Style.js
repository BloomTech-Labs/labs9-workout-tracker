import styled from "styled-components";

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 38px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.primaryDark};
  background-color: ${props => props.theme.primaryDark};
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
`;

export const DeleteButton = styled.button`
  width: 100%;
  height: 38px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.accent};
  color: ${props => props.theme.accent};
  background-color: white;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

export const SubmitButton = styled.button`
  width: ${props => (props.small ? "165px" : "100%")};
  height: 38px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.accent};
  background-color: ${props => props.theme.accent};
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

export const StyledError = styled.div`
  color: red;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.45);
  padding: 0px 15px;
  outline: none;
  font-size: 1.8rem;
`;

export const ModuleActions = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
