import React, { useState, useEffect } from "react";
import WorkoutTitleList from "./WorkoutTitleList";
import styled from "styled-components";
import axios from "axios";

const WorkoutCategoryStyle = styled.div``;

const WorkoutCategory = props => {
  // const [workouts, setWorkouts] = useState([]);

  // const getAllWorkouts = props => {
  //   const token = window.localStorage.getItem("login_token");
  //   axios
  //     .get("https://fitmetrix.herokuapp.com/api/workouts/all", {
  //       headers: {
  //         Authorization: token
  //       }
  //     })
  //     .then(response => {
  //       console.log("workouts: ", response.data);
  //       setWorkouts(response.data);
  //     });
  // };
  // useEffect(() => {
  //   getAllWorkouts();
  // }, []);

  return (
    <WorkoutCategoryStyle>
      <div>WORKOUT CARD
      {props.workouts.map(workout => {

        if (workout.category_id === props.category.id) {
          console.log("match? true", )
          return   <p>{workout.title}</p>
        }
      })
      }
      </div>
    </WorkoutCategoryStyle>
  );
};

export default WorkoutCategory;
