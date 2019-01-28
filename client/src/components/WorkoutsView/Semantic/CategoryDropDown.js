import React, { useContext } from "react";
import { Store } from "../../../index";
import { ValueInput, StyledButton } from "./Style";
import styled from "styled-components";

const CategoryDropDown = props => {
  const { state, dispatch } = useContext(Store);

  const handleChange = e => {
    const value = e.target.value;

    dispatch({
      type: "UPDATE_SELECTED_CATEGORY",
      payload: value
    });
  };

  return (
    <Container>
      <DropDown onChange={e => handleChange(e)} value={state.selectedCategory}>
        <DropDownItems value={"default"}>Select a Category</DropDownItems>
        {state.category &&
          state.category.map((category, index) => (
            <option value={category.id} key={index}>
              {category.name}
            </option>
          ))}
        <option value={"addCategory"}>Add a Category</option>
      </DropDown>
      <DropDownArrow>
        <i className="fas fa-chevron-down" />
      </DropDownArrow>
    </Container>
  );
};

const Container = styled.div`
  width: 250px;
  height: 36px;
  position: relative;
  border-radius: 12px;
`;

const DropDown = styled.select`
   box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.4); 
  border: none;
  padding: 0px 10px;
  appearance: none;
  width: 100%;
  height: 100%;
`;

const DropDownArrow = styled.span`
  width: 36px;
  height: 36px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 5;
  color: black;
`;

const DropDownItems = styled.option`
  display: none;
`;

export default CategoryDropDown;
