import React, { useState, useEffect, useContext } from "react";
import { Store } from "../../index";
import styled from "styled-components";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import FormModal from "../../shared/FormModal";
import DropDown from "../../shared/DropDown";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

const ScheduleWorkout = props => {
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
      name: "All",
      value: "all",
      key: "all"
    });

    return options;
  };

  const handleChange = value => {
    console.log("value:", value);
    dispatch({
      type: "UPDATE_SELECTED_WORKOUTS_CATEGORY",
      payload: value
    });
  };

  const [recurring, setRecurring] = useState(false);
  const [recurringWeeks, setRecurringWeeks] = useState(0);

  //handler to schedule the workout and add it to Sworkout Database
  const scheduleWorkoutHandler = async (e, workout, date, recurringWeeks) => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");

    const workoutObj = {
      date,
      workout_id: workout.id
    };

    const scheduleWorkout = await axios
      .post("https://fitmetrix.herokuapp.com/api/schedule/create", workoutObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
      .catch(err => console.log(err));

    if (recurring === true) {
      //Adds 7 days to the incoming date
      const addSevenDays = (date, seven) => {
        let result = new Date(date);
        result.setDate(result.getDate() + seven);
        return result;
      };

      for (let i = 1; i <= recurringWeeks - 1; i++) {
        const nextWeek = addSevenDays(date, 7);
        let nextWeekObj = new Date(nextWeek);
        console.log(nextWeekObj);
        const recurringWorkoutObj = {
          date: nextWeekObj,
          workout_id: workout.id
        };

        date = nextWeek;

        const scheduleRecurringWorkout = await axios
          .post(
            "https://fitmetrix.herokuapp.com/api/schedule/create",
            recurringWorkoutObj,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            }
          )
          .catch(err => console.log(err));
      }
    }

    // const token = await firebase.auth().currentUser.getIdToken();
    if (scheduleWorkout.status === 201) {
      console.log("I AM HERE");
      const newSW = await axios.get(
        "https://fitmetrix.herokuapp.com/api/schedule",
        {
          headers: {
            Authorization: token
          }
        }
      );

      dispatch({
        type: "UPDATE_SCHEDULE_WORKOUTS",
        payload: newSW.data
      });
      dispatch({ type: "UPDATE_DATE_SELECTED" });
      dispatch({ type: "UPDATE_SELECTED_DATE" });
    }
  };

  const handleClick = (workouId, i) => {
    if (showId === i) {
      handleUp(workouId, i)
    } else {
      handleDown(workouId, i)
    }
  }

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
    <FormModal
      onSubmit={{ scheduleWorkoutHandler }}
      closeModal={() => {
        dispatch({ type: "UPDATE_DATE_SELECTED" });
        dispatch({ type: "UPDATE_SELECTED_DATE" });
      }}
      title={"Schedule Workout"}
    >
      <HeaderContainer>
        <Header>
          <DropDownContainer>
            <h1>My Workouts</h1>
            <h2>{state.currentDate.toLocaleString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</h2>
            <DropDown
              label={'Filter by Category'}
              options={getOptions()}
              onChange={handleChange}
              value={state.selectedWorkoutCategory}
            />
          </DropDownContainer>
        </Header>
        {state.workouts && state.workouts.map((workout, i) => {
          if (state.selectedWorkoutCategory === 'all') {
            return (
              <Workout key={i} onClick={() => handleClick(workout.id, i)} className={`workoutsCard-${showId === i ? 'showEx' : 'hideEx'}`}>
                <WorkoutsTitle className={`workoutsTitle`}>
                  <WorkoutsCard className="test">
                    <h3>{workout.title}</h3>
                  </WorkoutsCard>
                  <span>
                    {showId === i 
                    ? (<i className="fas fa-arrow-up" />)  
                    : (
                      <i className="fas fa-arrow-down" />
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
                  <ButtonContainer >
                    <Button size="responsive" onClick={e => scheduleWorkoutHandler(e, workout, state.currentDate, recurringWeeks)}>Schedule</Button>
                  </ButtonContainer>

                </ExercisesCard>
              </Workout>
            );
          }
          if (workout.category_id == state.selectedWorkoutCategory) {
            return (
              <Workout key={i} onClick={() => handleClick(workout.id, i)} className={`workoutsCard-${showId === i ? 'showEx' : 'hideEx'}`}>
                <WorkoutsTitle className={`workoutsTitle`}>
                  <WorkoutsCard className="test">
                    <h3>{workout.title}</h3>
                  </WorkoutsCard>
                  <span>
                    {showId === i ? (
                      null
                    ) : (
                      <i className="fas fa-arrow-down" />
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
                    <Button size="responsive" onClick={e => scheduleWorkoutHandler(e, workout, state.currentDate, recurringWeeks)}>Schedule</Button>
                  </ButtonContainer>
                </ExercisesCard>
              </Workout>
            );
          }
          return null;
        })}
      </HeaderContainer>
    </FormModal>
  );
};

export default ScheduleWorkout;

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
  h2 {
    margin-left: 0;
  }
  @media (max-width: 670px) {
  }
`;

const ButtonContainer = styled.div`
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
  transition: height 200ms ease-in;
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
  font-weight: 600;
  display: flex;
  font-size: 1.4rem;
  margin-bottom: 0px;
  text-align: left;
`;

const ExDetailsListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;
