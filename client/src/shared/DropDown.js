import React from "react";
import styled from "styled-components";

const DropDown = ({ options, value, onChange }) => {
  return (
    <Container>
      <StyledDropDown onChange={e => onChange(e.target.value)} value={value}>
        {options &&
          options.map(option => (
            <StyledOption value={option.value} key={option.key}>
              {option.name}
            </StyledOption>
          ))}
      </StyledDropDown>
      <DropDownArrow>
        <i className="fas fa-chevron-down" />
      </DropDownArrow>
    </Container>
  );
};

const StyledOption = styled.option`
  width: 100%;
  border: none;
`;

const Container = styled.div`
  width: 250px;
  height: 36px;
  position: relative;
  border-radius: 6px;
`;

const StyledDropDown = styled.select`
  box-shadow: 0 1px 2px 0 hsla(0, 0%, 0%, 0.4);
  border: none;
  padding: 0px 10px;
  appearance: none;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
`;

const DropDownArrow = styled.span`
  width: 0px;
  height: 0px;
  margin-right: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 5;
  color: black;
`;

export default DropDown;
