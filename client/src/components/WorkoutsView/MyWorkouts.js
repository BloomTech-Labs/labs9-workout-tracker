import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../../index';
import firebase from 'firebase';
import styled from 'styled-components';
import DropDown from '../../shared/DropDown';
import Button from '../../shared/Button';
import axios from 'axios';
import Loading from '../Loading';

const MyWorkouts = () => {
  //Accesses state and dispatch with the useContext Hook.
  const { state, dispatch } = useContext(Store);

  const [showId, setShowId] = useState(null);

  const getOptions = () => {
    let options = state.category.map((cat, i) => {
      return {
        name: cat.name,
        value: cat.id,
        key: cat.id
      };
    });

    options.unshift({
      name: 'All',
      value: 'all',
      key: 'all'
    });

    return options;
  };

  const getExercises = workout => {
    let exercises = workout.exercises.map((ex, i) => {
      return {
        name: ex.name,
        value: ex.id,
        key: ex.id
      };
    });

    exercises.unshift({
      name: workout.title,
      value: workout.title,
      key: workout.title
    });

    return exercises;
  };

  const handleChange = value => {
    dispatch({
      type: 'UPDATE_SELECTED_WORKOUTS_CATEGORY',
      payload: value
    });
  };

  const handleAdd = e => {
    console.log('in handleAdd');
    dispatch({ type: 'RESET_EDIT_WORKOUT' });

    dispatch({
      type: 'SHOW_WORKOUT_FORM',
      payload: true
    });
  };

  const handleEdit = async (workoutID, i) => {
    console.log('in handleEdit');

    dispatch({
      type: 'SHOW_WORKOUT_FORM',
      payload: true
    });

    dispatch({
      type: 'EDIT_WORKOUT',
      payload: state.workouts[i]
    });
  };

  const handleDown = async (workoutID, i) => {
    console.log('in handleDown');

    setShowId(i);

    dispatch({
      type: 'SHOW_EXERCISES'
    });
  };

  const handleUp = async (workoutID, i) => {
    console.log('in handleDown');

    setShowId(null);

    dispatch({
      type: 'SHOW_EXERCISES'
    });
  };

  return (
    <HeaderContainer>
      <Header>
        <DropDownContainer>
          <h1>My Workouts</h1>
          <DropDown
            label={'Filter by Category'}
            options={getOptions()}
            onChange={handleChange}
            value={state.selectedWorkoutCategory}
          />
        </DropDownContainer>
        <AddButtonContainer>
          <Button onClick={() => handleAdd()} type="button">
            Add Workout
          </Button>
        </AddButtonContainer>
      </Header>

      {state.workouts.length !== 0 &&
        state.workouts.map((workout, i) => {
          if (state.selectedWorkoutCategory === 'all') {
            return (
              <Workout key={i} className={`workoutsCard-${showId === i ? 'showEx' : 'hideEx'}`}>
                <WorkoutsTitle className={`workoutsTitle`}>
                  <WorkoutsCard onClick={() => handleDown(workout.id, i)} className="test">
                    <h3>{workout.title}</h3>
                  </WorkoutsCard>
                  <span>
                    {showId === i ? (
                      <span className="upArrow">
                        <i onClick={() => handleUp(workout.id, i)} className="fas fa-arrow-up" />
                      </span>
                    ) : (
                      <i onClick={() => handleDown(workout.id, i)} className="fas fa-arrow-down" />
                    )}
                  </span>
                </WorkoutsTitle>
                <ExercisesCard className={`exerciseCard-${showId === i ? 'showEx' : 'hideEx'}`}>
                  <ExDetailsTitle>
                    <ExDetailsP className="name">Exercise</ExDetailsP>
                    <ExDetailsP>Weight</ExDetailsP>
                    <ExDetailsP>Sets</ExDetailsP>
                    <ExDetailsP>Reps</ExDetailsP>
                  </ExDetailsTitle>
                  {workout.exercises.map((ex, i) => {
                    return (
                      <ExDetailsDiv key={ex.id}>
                        <ExDetailsListDiv>
                          <ExDetailsP className="name"> {ex.name}</ExDetailsP>
                          <ExDetailsP>{ex.weight}</ExDetailsP>
                          <ExDetailsP>{ex.sets}</ExDetailsP>
                          <ExDetailsP>{ex.reps}</ExDetailsP>
                        </ExDetailsListDiv>
                      </ExDetailsDiv>
                    );
                  })}

                  <ButtonContainer>
                    <Button onClick={() => handleEdit(workout.id, i)} className="fas fa-edit">
                      Edit Workout
                    </Button>
                  </ButtonContainer>
                </ExercisesCard>
              </Workout>
            );
          }
          if (workout.category_id == state.selectedWorkoutCategory) {
            return (
              <Workout key={i} className={`workoutsCard-${showId === i ? 'showEx' : 'hideEx'}`}>
                <WorkoutsTitle className={`workoutsTitle`}>
                  <WorkoutsCard onClick={() => handleDown(workout.id, i)} className="test">
                    <h3>{workout.title}</h3>
                  </WorkoutsCard>
                  <span>
                    {showId === i ? (
                      <span className="upArrow">
                        <i onClick={() => handleUp(workout.id, i)} className="fas fa-arrow-up" />
                      </span>
                    ) : (
                      <i onClick={() => handleDown(workout.id, i)} className="fas fa-arrow-down" />
                    )}
                  </span>
                </WorkoutsTitle>
                <ExercisesCard className={`exerciseCard-${showId === i ? 'showEx' : 'hideEx'}`}>
                  <ExDetailsTitle>
                    <ExDetailsP className="name">Exercise</ExDetailsP>
                    <ExDetailsP>Weight</ExDetailsP>
                    <ExDetailsP>Sets</ExDetailsP>
                    <ExDetailsP>Reps</ExDetailsP>
                  </ExDetailsTitle>
                  {workout.exercises.map((ex, i) => {
                    return (
                      <ExDetailsDiv key={ex.id}>
                        <ExDetailsListDiv>
                          <ExDetailsP className="name">{ex.name}</ExDetailsP>
                          <ExDetailsP>{ex.weight}</ExDetailsP>
                          <ExDetailsP>{ex.sets}</ExDetailsP>
                          <ExDetailsP>{ex.reps}</ExDetailsP>
                        </ExDetailsListDiv>
                      </ExDetailsDiv>
                    );
                  })}
                </ExercisesCard>
              </Workout>
            );
          }
          return null;
        })}

      {state.workouts.length === 0 ? (
        <SchedulePrompt>No workouts made yet. Let's create one!</SchedulePrompt>

      ) : (
        Loading
      )}
    </HeaderContainer>
  );
};

export default MyWorkouts;

const WorkoutsCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ExercisesCard = styled.div``;

const WorkoutsTitle = styled.div`
  width: 100%;
  display: flex;
`;

const SchedulePrompt = styled.div`
color: ${props => props.theme.primaryDark};
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 100px;
  text-align: center;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 670px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: 670px) {
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AddButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Workout = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f4f8;
  margin-bottom: 20px;
  padding: 10px 16px;
  border-radius: 8px;
  h3 {
    margin: 0px;
  }
  span {
    margin-left: 20px;
    cursor: pointer;
  }
  @media (max-width: 670px) {
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  @media (max-width: 670px) {
  }
`;

const ExDetailsDiv = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-around;
  height: 60px;
  width: 100%;
  flex-wrap: wrap;
  text-align: left;
  align-items: center;
  h3 {
    width: calc(100% / 5);
  }
`;

const ExDetailsTitle = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-around;
  height: 60px;
  width: 100%;
  flex-wrap: wrap;
  font-weight: bold;
  align-items: center;
  h3 {
    width: calc(100% / 5);
  }
`;

const ExDetailsP = styled.p`
  width: 17%;
  display: block;
  font-size: 1.4rem;
  margin-bottom: 0px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExDetailsListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

{
  /* <i onClick={() => handleEdit(workout.id, i)} className="fas fa-edit" /> */
}
