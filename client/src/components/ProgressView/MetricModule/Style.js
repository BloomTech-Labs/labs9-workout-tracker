import styled from "styled-components";

export const StyledError = styled.div`
  color: red;
  font-size: 16px;
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
  justify-content: space-between;
  align-items: center;
`;

export const MetricFormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const MetricForm = styled.form`
  width: 340px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
  padding: 30px 40px;
`;
