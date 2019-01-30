import React from "react";
import styled, {css} from "styled-components";
import DatePicker from "react-datepicker";

const CalendarInput = ({onChange, placeholder, value, isSecure, id, onClick, isDisabled}) => {

  console.log(isDisabled);
  if (isDisabled === "true") {
    return(
        <StyledInput
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          isSecure={isSecure}
          id={id}
          onClick={onClick}
          disabled
        />  
      );
  }
  return(
      <StyledInput
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        isSecure={isSecure}
        id={id}
        onClick={onClick}
      />  
    );
};

const Input = ({ size, value, name, onChange, placeholder, label, type, isDisabled, labelColor}) => {
  if (type === "calendar") {
    return (
      <Container size={size}>
        <StyledLabel>{label}</StyledLabel>
        <DatePicker 
          selected={value} 
          onChange={onChange}
          customInput={<CalendarInput isDisabled={isDisabled}/>}
        />
      </Container>
    )
  }
  return (
    <Container size={size}>
      <StyledLabel 
        labelColor={labelColor}
      >{label}</StyledLabel>
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
  ${props => props.labelColor && css`
    color: ${props.labelColor}
  `}
`;

const Container = styled.div`
  width: ${props => (props.size === "large" ? "245px" : props.size === "responsive" ? "100%" : props.size === "medium" ? "155px" : "100px")};
  ${props => props.size === "responsive" ? "margin: 10px 0px;" : ""}
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
`;
