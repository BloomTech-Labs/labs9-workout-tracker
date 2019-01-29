import React, { useState, useContext } from 'react';
import { Store } from '../../index';

import ExerciseDetails from './ExerciseDetails';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import AddWorkout from './AddWorkout';

const WorkoutDetails = props => {
  const { state, dispatch } = useContext(Store);

  const [selectedDate, setSelectedDate] = useState(state.selectedDate);
  const [addingWorkout, setAddingWorkout] = useState(false);

  const dateStringParser = date => {
    if (date.length === 10) {
      return date;
    }
    date = date.split('T')[0].split('-');

    const newDate = date[0] + '/' + date[1] + '/' + date[2];

    return new Date(newDate);
  };

  const toggleAddingWorkout = e => {
    e.preventDefault();
    setAddingWorkout(!addingWorkout);
  };

  const dateFormat = d => {
    let month = d.getMonth() + 1;
    let day = d.getDate();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = '0' + month;
    }

    return `${d.getFullYear()}-${month}-${day}`;
  };

  const unscheduleWorkout = async (e, scheduleWorkout) => {
    console.log(scheduleWorkout);
    const token = await firebase.auth().currentUser.getIdToken();

    const deleteRes = await axios.delete(
      `https://fitmetrix.herokuapp.com/api/schedule/delete/workout/${scheduleWorkout.id}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    console.log('deleteRes:', deleteRes);

    if (deleteRes.status === 200) {
      console.log('200 OK');
      const newScheduleWorkouts = await axios.get('https://fitmetrix.herokuapp.com/api/schedule', {
        headers: {
          Authorization: token
        }
      });

      dispatch({
        type: 'UPDATE_SCHEDULE_WORKOUTS',
        payload: newScheduleWorkouts.data
      });
    }
  };

  const renderWorkout = () => {
    if (props.datePopulated === false) {
      return (
        <div>
          <WorkoutDetailsDiv>
            No workouts Scheduled
            <ScheduleButton
              onClick={e => {
                toggleAddingWorkout(e);
              }}
            >
              Schedule Workout
            </ScheduleButton>
            {addingWorkout === true ? (
              <AddWorkout
                workouts={state.workouts}
                scheduleWorkouts={state.scheduleWorkouts}
                selectedDate={props.selectedDate}
              />
            ) : null}
          </WorkoutDetailsDiv>
        </div>
      );
    }
  };

  // const renderWorkout = () => {
  //   if (props.datePopulated === false) {
  //     return (
  //       <WorkoutDetailsDiv>No workouts Scheduled</WorkoutDetailsDiv>
  //     )
  //   }
  // }

  return (
    <WorkoutContainer>
      {renderWorkout()}
      {props.selectedDate === null
        ? state.scheduleWorkouts &&
          state.scheduleWorkouts.map(scheduleWorkout => {
            if (dateFormat(dateStringParser(scheduleWorkout.date)) === dateFormat(props.currentDay)) {
              return (
                <WorkoutDetailsDiv key={scheduleWorkout.id}>
                  <WorkoutTitleDiv>
                    <h3>{scheduleWorkout.title}</h3>
                    <UnscheduleButton type="button" onClick={e => unscheduleWorkout(e, scheduleWorkout)}>
                      Unschedule
                    </UnscheduleButton>
                  </WorkoutTitleDiv>
                  <ExerciseListDiv>
                    {scheduleWorkout.exercises &&
                      scheduleWorkout.exercises.map(exercise => {
                        return <ExerciseDetails dispatch={props.dispatch} key={exercise.id} exercise={exercise} />;
                      })}
                  </ExerciseListDiv>
                </WorkoutDetailsDiv>
              );
            }
          })
        : state.scheduleWorkouts &&
          state.scheduleWorkouts.map(scheduleWorkout => {
            if (dateFormat(dateStringParser(scheduleWorkout.date)) === dateFormat(props.selectedDate)) {
              return (
                <WorkoutDetailsDiv key={scheduleWorkout.id}>
                  <WorkoutTitleDiv>
                    <h3>{scheduleWorkout.title}</h3>
                    <UnscheduleButton type="button" onClick={e => unscheduleWorkout(e, scheduleWorkout)}>
                      Unschedule
                    </UnscheduleButton>
                  </WorkoutTitleDiv>
                  <ExerciseListDiv>
                    {scheduleWorkout.exercises &&
                      scheduleWorkout.exercises.map(exercise => {
                        return <ExerciseDetails dispatch={props.dispatch} key={exercise.id} exercise={exercise} />;
                      })}
                  </ExerciseListDiv>
                </WorkoutDetailsDiv>
              );
            }
          })}
    </WorkoutContainer>
  );
};

export default WorkoutDetails;

const WorkoutContainer = styled.div`
  justify-content: space-around;
  background-color: white;
`;
const WorkoutDetailsDiv = styled.div`
display:flex
border:1px solid #eee;
border-radius: 4px;
padding: 10px;
width:100%
justify-content: space-around;
flex-direction:column;
align-items: center;
`;

const WorkoutTitleDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const ExerciseListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  div:last-child {
    border-bottom: none;
  }
`;

const ScheduleButton = styled.button`
  color: white;
  background-color: ${props => props.theme.accent};
  border-radius: 4px;
  box-shadow: ${props => props.theme.boxShadow};
  border: none;
`;

const UnscheduleButton = styled.button`
  color: white;
  background-color: ${props => props.theme.accent};
  border-radius: 4px;
  box-shadow: ${props => props.theme.boxShadow};
  border: none;
`;
