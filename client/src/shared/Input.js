import React from "react";
import styled from "styled-components";

const Input = ({ size, value, name, onChange, placeholder, label }) => {
  return (
    <Container size={size}>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </Container>
  );
};

export default Input;

const StyledLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Container = styled.div`
  width: ${props => (props.size === "large" ? "245px" : "100px")};
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 4px;
  padding: 0px 10px;
  border: 1px solid rgba(0,0,0,0.24);
  /* box-shadow: ${props => props.theme.boxShadow}; */
`;
