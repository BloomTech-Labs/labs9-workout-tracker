import React, { useContext, useState } from "react";
import { Store } from "../../../index";
import styled from "styled-components";
import CategoryDropDown from "./CategoryDropDown";

const MyWorkouts = () => {
  //Accesses state and dispatch with the useContext Hook.
  const { state, dispatch } = useContext(Store);

  return (
    <Container>
      <Row>
        <h2>My Workouts</h2>
        <CategoryDropDown />
      </Row>
      {state.workouts.map((workout, i) => {
        if (workout.category_id == state.selectedCategory) {
          return (
            <Workout>
              <h3>{workout.title}</h3>
              <div>
                <span>
                  <i class="fas fa-pen" />
                </span>
                <span>
                  <i class="fas fa-times" />
                </span>
              </div>
            </Workout>
          );
        }
        return null;
      })}
    </Container>
  );
};

export default MyWorkouts;

const Workout = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f4f8;
  margin-bottom: 20px;
  padding: 0px 16px;
  border-radius: 8px;
  h3 {
    margin: 0px;
  }
  span {
    margin-left: 20px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Row = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
