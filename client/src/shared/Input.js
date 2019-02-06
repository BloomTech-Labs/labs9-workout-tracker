import React from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';

const CalendarInput = ({ onChange, placeholder, value, isSecure, id, onClick, isDisabled }) => {
  console.log(isDisabled);
  if (isDisabled === 'true') {
    return (
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
  return (
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

const Input = ({ size, value, name, onChange, placeholder, label, type, isDisabled, labelColor }) => {
  if (type === 'calendar') {
    return (
      <Container size={size}>
        <StyledLabel>{label}</StyledLabel>
        <DatePicker selected={value} onChange={onChange} customInput={<CalendarInput isDisabled={isDisabled} />} />
      </Container>
    );
  }
  return (
    <Container size={size}>
      <StyledLabel labelColor={labelColor}>{label}</StyledLabel>
      {
        isDisabled === 'true' 
        ? (<StyledInput value={''} name={name} onChange={onChange} placeholder={"Pro Feature"} disabled />)
        : (<StyledInput value={value} name={name} onChange={onChange} placeholder={placeholder} required />)
      }
      
    </Container>
  );
};

export default Input;

const StyledLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  ${props =>
    props.labelColor &&
    css`
      color: ${props.labelColor};
    `}
`;

const Container = styled.div`
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  width: 100px;
  ${props => props.size === "small" && css`
    width: 80px;
    /* margin-right: 20px; */
  `}
  
  ${props => props.size === "medium" && css`
    width: 155px;
  `}

  ${props => props.size === "large" && css`
    width: 245px;
  `}
  ${props => props.size === "responsive" && css`
    width: 100%;
    margin: 10px 0px;
  `}

  @media (max-width: 670px) {
    ${props => props.size === "large" && css`
      width: 100%;
    `}
    ${props => props.size === "small" && css`
      margin-right: 0px;
    `}
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 6px;
  padding: 0px 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
`;
