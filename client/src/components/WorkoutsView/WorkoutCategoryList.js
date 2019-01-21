import React, { useState, useEffect } from "react";
import WorkoutCategory from "./WorkoutCategory";
import styled from "styled-components";
import axios from "axios";

const WorkoutCategoryListStyle = styled.div`
  font-family: ${props => props.theme.roboto};
  font-size: 2em;
  font-weight: bold;
  color: ${props => props.theme.accent};
  background-color: ${props => props.theme.primary};
  margin-right: 25%;
  padding: 0 10px;
  border-radius: 6px;
`;

const WorkoutCategoryList = props => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = props => {
    const token = window.localStorage.getItem("login_token");
    axios
      .get("https://fitmetrix.herokuapp.com/api/category/all", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        setCategories(response.data);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <WorkoutCategoryListStyle>
      {categories.map(category => {
        return (
          <div>
            {category.name}
            <WorkoutCategory category={category} />
          </div>
        );
      })}
    </WorkoutCategoryListStyle>
  );
};

export default WorkoutCategoryList;
