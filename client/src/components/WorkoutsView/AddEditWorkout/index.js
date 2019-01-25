import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import { Store } from "../../index";

const AddEditWorkout = props => {
  const { state, dispatch } = useContext(Store);

  //  Create variable to store workout
  let initialWorkoutValue = {
    category_id: null,
    title: "",
    exercises: []
  };

  //useState hooks to set the Category that was chosen
  const [category, setCategory] = useState("default");
  const [addCategory, setAddCategory] = useState("");

  //add Category handler
  const submitCategory = async e => {
    e.preventDefault();
    console.log("Adding a category", addCategory);

    const token = window.localStorage.getItem("login_token");

    // adds the created category to a user's available categories
    if (token !== undefined) {
      const res = await axios.post(
        "https://fitmetrix.herokuapp.com/api/category/create",
        {
          name: addCategory,
          user_id: state.id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      );
      console.log("the current category is: ", addCategory);
    }
    //Resets the category to default after it's been added
    setAddCategory("");
  };

  //Puts the categories into a dropdown component
  const categoryComponent = (
    //setCategory is used to set the value of `category`
    <select onChange={e => setCategory(e.target.value)} value={category}>
      <option value={"default"}>--- Select a Category ---</option>
      {/* Maps through the categories on state and populates the list with the category names*/}
      {state.category &&
        state.category.map((category, index) => (
          <option value={category.id} key={index}>
            {category.name}
          </option>
        ))}
      {/* Gives an option to add a category with the default value from the setAddCategory Hook*/}
      <option value={"addCategory"}>--- Add a Category ---</option>
    </select>
  );

  const renderForm = () => {
    if (state.editWorkout === null) {
      return (
        <div>
          {/* Dropdown component that displays the user's categories */}
          <div>{categoryComponent}</div>
          {/* Conditional that renders an input that allows you to add a category using a Hook */}
          {category === "addCategory" ? (
            <>
              <ValueInput
                value={addCategory}
                type="text"
                placeholder="Category Name"
                onChange={e => setAddCategory(e.target.value)}
              />
              <StyledButton type="button" onClick={e => submitCategory(e)}>
                Add Category
              </StyledButton>
            </>
          ) : null}
          <div>Hi in Add mode</div>
        </div>
      );
    }

    return (
      <div>
        {/* Dropdown component that displays the user's categories */}
        <div>{categoryComponent}</div>
        {/* Conditional that renders an input that allows you to add a category using a Hook */}
        {category === "addCategory" ? (
          <>
            <ValueInput
              value={addCategory}
              type="text"
              placeholder="Category Name"
              onChange={e => setAddCategory(e.target.value)}
            />
            <StyledButton type="button" onClick={e => submitCategory(e)}>
              Add Category
            </StyledButton>
          </>
        ) : null}
      </div>
    );
  };

  return renderForm();
};

export default AddEditWorkout;

const StyledButton = styled.button`
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

const ValueInput = styled.input`
  height: 30px;
  width: 80%;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
`;
