import React, { useContext } from "react";
import { Store } from "../../index";
import FormModal from "../../shared/FormModal";
import ExerciseDetails from "./ExerciseDetails";
import axios from "axios";
import styled from "styled-components";
import firebase from "firebase";
import Button from "../../shared/Button";

const WorkoutDetails = props => {
  const { state, dispatch } = useContext(Store);

  const { currentDate } = state;

  const dateStringParser = date => {
    if (date.length === 10) {
      return date;
    }
    date = date.split("T")[0].split("-");

    const newDate = date[0] + "/" + date[1] + "/" + date[2];

    return new Date(newDate);
  };

  const dateFormat = d => {
    let month = d.getMonth() + 1;
    let day = d.getDate();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    return `${d.getFullYear()}-${month}-${day}`;
  };

  const unscheduleWorkout = async (e, scheduleWorkout) => {
    console.log(scheduleWorkout);
    const token = await firebase.auth().currentUser.getIdToken();

    const deleteRes = await axios.delete(
      `https://fitmetrix.herokuapp.com/api/schedule/delete/workout/${
        scheduleWorkout.id
      }`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    console.log("deleteRes:", deleteRes);

    if (deleteRes.status === 200) {
      console.log("200 OK");
      const newScheduleWorkouts = await axios.get(
        "https://fitmetrix.herokuapp.com/api/schedule",
        {
          headers: {
            Authorization: token
          }
        }
      );

      if (Array.isArray(newScheduleWorkouts.data)) {
        dispatch({ type: "UPDATE_DATE_SELECTED" });
        dispatch({
          type: "UPDATE_SCHEDULE_WORKOUTS",
          payload: newScheduleWorkouts.data
        });
        dispatch({ type: "UPDATE_CURRENT_DAY", payload: null });
      } else {
        dispatch({ type: "UPDATE_DATE_SELECTED" });
        dispatch({ type: "UPDATE_CURRENT_DAY", payload: null });
        dispatch({ type: "UPDATE_SCHEDULE_WORKOUTS", payload: [] });
      }
    }
  };

  const completedWorkout = async (e, scheduleWorkout) => {
    e.preventDefault();
    const token = await firebase.auth().currentUser.getIdToken();
    console.log("swkt:", scheduleWorkout);

    const updateRes = await axios
      .put(
        `https://fitmetrix.herokuapp.com/api/schedule/edit/workout/${
          scheduleWorkout.id
        }`,
        { completed: true },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .catch(err => console.log("err", err));
    if (updateRes.status === 200) {
      console.log("200 OK");
      const newScheduleWorkouts = await axios.get(
        "https://fitmetrix.herokuapp.com/api/schedule",
        {
          headers: {
            Authorization: token
          }
        }
      );

      dispatch({
        type: "UPDATE_SCHEDULE_WORKOUTS",
        payload: newScheduleWorkouts.data
      });
      dispatch({ type: "UPDATE_DATE_SELECTED" });
      dispatch({ type: "UPDATE_CURRENT_DAY", payload: null });
    }
  };

  return (
    <FormModal
      closeModal={() => {
        dispatch({ type: "UPDATE_DATE_SELECTED" });
        dispatch({ type: "UPDATE_CURRENT_DAY", payload: null });
      }}
      title={"Workout Details"}
    >
      <WorkoutContainer>
        {state.scheduleWorkouts &&
          state.scheduleWorkouts.map(scheduleWorkout => {
            const newScheduleDate = new Date(currentDate);
            const sDay = dateFormat(dateStringParser(scheduleWorkout.date));
            const cDay = dateFormat(new Date(currentDate));
            console.log("sDay: ", sDay);
            console.log("cDay: ", cDay);
            if (sDay === cDay) {
              return (
                <WorkoutDetailsDiv key={scheduleWorkout.id}>
                  <WorkoutTitleDiv>
                    <h1>{scheduleWorkout.title}</h1>
                    <h2>
                      {newScheduleDate.toLocaleString("en-us", {
                        weekday: "long",
                        month: "long",
                        year: "numeric",
                        day: "numeric"
                      })}
                    </h2>
                  </WorkoutTitleDiv>
                  <ExerciseListDiv>
                    <ExDetailsTitle>
                      <ExerciseDetailsP>Exercise</ExerciseDetailsP>
                      <ExDetailsP>Weight</ExDetailsP>
                      <ExDetailsP>Sets</ExDetailsP>
                      <ExDetailsP>Reps</ExDetailsP>
                      {/* <ExDetailsP>Done</ExDetailsP> */}
                    </ExDetailsTitle>
                    {scheduleWorkout.exercises &&
                      scheduleWorkout.exercises.map(exercise => {
                        return (
                          <ExerciseDetails
                            dispatch={props.dispatch}
                            key={exercise.id}
                            exercise={exercise}
                          />
                        );
                      })}
                  </ExerciseListDiv>

                  {scheduleWorkout.completed ? null : (
                    <Button
                      type="button"
                      size="large"
                      onClick={e => completedWorkout(e, scheduleWorkout)}
                    >
                      Complete
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="large"
                    scheme="cancel"
                    onClick={e => unscheduleWorkout(e, scheduleWorkout)}
                  >
                    Unschedule
                  </Button>
                </WorkoutDetailsDiv>
              );
            }
            return null;
          })}
      </WorkoutContainer>
    </FormModal>
  );
};

export default WorkoutDetails;

const ExDetailsTitle = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
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
  width: 25%;
  font-size: 1.4rem;
  margin-bottom: 0px;
  text-align: center;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExerciseDetailsP = styled(ExDetailsP)`
text-align: initial;
`;

const WorkoutContainer = styled.div`
  justify-content: space-around;
  background-color: white;
`;
const WorkoutDetailsDiv = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 600px;
  button {
    margin-top: 30px;
  }
`;

const WorkoutTitleDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

const ExerciseListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  margin-top: 30px;
  width: 100%;
  div:last-child {
    border-bottom: none;
  }
`;
