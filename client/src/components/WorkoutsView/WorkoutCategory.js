import React, { useState, useEffect } from "react";
import WorkoutTitleList from "./WorkoutTitleList";
import styled from "styled-components";
import axios from "axios";

const WorkoutCategoryStyle = styled.div``;

const WorkoutCategory = props => {
  const [workouts, setWorkouts] = useState([]);

  const getAllWorkouts = props => {
    const token = window.localStorage.getItem("login_token");
    axios
      .get("https://fitmetrix.herokuapp.com/api/workouts/all", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        console.log("workouts: ", response.data);
        setWorkouts(response.data);
      });
  };
  useEffect(() => {
    getAllWorkouts();
  }, []);

  return (
    <WorkoutCategoryStyle>
      <div>WORKOUT CARD</div>
      {/* {workouts.filter(workout => {
        return workout.category_id === props.category.id;
      })} */}
      {workouts.category_id === props.category.id ?   
      <p>{workouts.title}</p>
      :
      null
    }
    </WorkoutCategoryStyle>
  );
};

export default WorkoutCategory;
