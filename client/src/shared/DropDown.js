import React from "react";
import styled from "styled-components";

const DropDown = ({ options, value, onChange, label }) => {
  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <DropDownContainer>
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
      </DropDownContainer>
    </Container>
  );
};


export default DropDown;

const Container = styled.div`
  width: 245px;
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 670px) {
      width: 100%;
  }
`;


const StyledLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const StyledOption = styled.option`
  width: 100%;
  border: none;
`;

const DropDownContainer = styled.div`
  width: 100%;
  height: 36px;
  position: relative;
  border-radius: 6px;
`;

const StyledDropDown = styled.select`
  /* box-shadow: ${props => props.theme.boxShadow}; */
  border: none;
  border: 1px solid rgba(0,0,0,0.24);
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

