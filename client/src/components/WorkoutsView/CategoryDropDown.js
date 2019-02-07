import React, { useContext } from "react";
import { Store } from "../../index";
import DropDown from "../../shared/DropDown";

const CategoryDropDown = props => {
  const { state, dispatch } = useContext(Store);

  const handleChange = value => {
    dispatch({
      type: "UPDATE_SELECTED_CATEGORY",
      payload: value
    });
  };

  const getOptions = () => {
    let options = state.category.map((cat, i) => {
      return {
        name: cat.name,
        value: cat.id,
        key: cat.id
      };
    });

    options.unshift({
      name: "Select Category",
      value: "default",
      key: "default"
    });

    options.push({
      name: "Add a Category",
      value: "add",
      key: "add"
    });

    return options;
  };

  return (
    <DropDown
      label="Workout Category"
      options={getOptions()}
      onChange={handleChange}
      value={state.selectedCategory}
    />
  );
};

export default CategoryDropDown;
