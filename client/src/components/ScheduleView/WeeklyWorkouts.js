import React, { useContext, useState, useEffect } from "react";
import { Store } from "../../index";
import styled from "styled-components";
import dateFns from "date-fns";

const WeeklyWorkotus = () => {
  const { state, dispatch } = useContext(Store);

  const { scheduleWorkouts, currentDate } = state;
  const [sortedWorkouts, setSortedWorkouts] = useState([]);
  const [weekArray, setWeekArray] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getSortedWorkouts();
  }, [state.scheduleWorkouts]);

  const getSortedWorkouts = () => {
    const copy = scheduleWorkouts;

    copy.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate - bDate;
    });
    let currentIndex = null;

    for (let i = 0; i < copy.length; i++) {
      // ("0" + this.getDate()).slice(-2)
      // ("0" + (this.getMonth() + 1)).slice(-2)
      const cDate = `${new Date(copy[i].date).getMonth() + 1}${(
        "0" +
        (new Date(copy[i].date).getDate() + 1)
      ).slice(-2)}`;
      const currentD = `${new Date().getMonth() + 1}${(
        "0" + new Date().getDate()
      ).slice(-2)}`;

      if (cDate >= currentD) {
        currentIndex = i;
        break;
      }
    }

    console.log("currentIntex", currentIndex);

    if (currentIndex !== 0 && currentIndex !== null) {
      const copySlice = copy.slice(currentIndex);
      setSortedWorkouts(copySlice);
      return;
    }

    if (currentIndex === null) {
      setSortedWorkouts([]);
      return;
    }

    setSortedWorkouts(copy);
  };

  const dateStringParser = date => {
    date = date.split("T")[0].split("-");

    const newDate = date[0] + "/" + date[1] + "/" + date[2];

    return newDate;
  };

  const onDateClick = day => {
    const newDate = new Date(dateStringParser(day));
    dispatch({ type: "UPDATE_CURRENT_DAY", payload: newDate });
    dispatch({ type: "UPDATE_DATE_SELECTED" });
    dispatch({ type: "UPDATE_IS_POPULATED", payload: true });
  };

  return (
    <DisplayWorkoutsDiv>
      <h3>Upcoming workouts</h3>
      <DisplayWorkouts>
        {sortedWorkouts &&
          weekArray.map((_, i) => {
            if (i % 2 === 0 && i < 7) {
              if (sortedWorkouts[i]) {
                return (
                  <GrayWorkoutCard
                    key={sortedWorkouts[i].id}
                    onClick={() => onDateClick(sortedWorkouts[i].date)}
                  >
                    <h4>
                      {new Date(
                        dateStringParser(sortedWorkouts[i].date)
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit"
                      })}
                    </h4>
                    <p>{sortedWorkouts[i].title}</p>
                    <p>{sortedWorkouts[i].category.name}</p>
                  </GrayWorkoutCard>
                );
              } else {
                return (
                  <EmptyGrayWorkoutCard key={Math.random()}>
                    <p>No Upcoming Workout</p>
                  </EmptyGrayWorkoutCard>
                );
              }
            } else if (i % 2 === 1 && i < 7) {
              if (sortedWorkouts[i]) {
                return (
                  <WorkoutCard
                    key={sortedWorkouts[i].id}
                    onClick={() => onDateClick(sortedWorkouts[i].date)}
                  >
                    <h4>
                      {new Date(
                        dateStringParser(sortedWorkouts[i].date)
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit"
                      })}
                    </h4>
                    <p>{sortedWorkouts[i].title}</p>
                    <p>{sortedWorkouts[i].category.name}</p>
                  </WorkoutCard>
                );
              } else {
                return (
                  <EmptyWorkoutCard key={Math.random()}>
                    <p>No Upcoming Workout</p>
                  </EmptyWorkoutCard>
                );
              }
            }
          })}
      </DisplayWorkouts>
    </DisplayWorkoutsDiv>
  );
};

export default WeeklyWorkotus;

const DisplayWorkoutsDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  color: rgb(64, 88, 101);
  h3 {
    align-self: baseline;
    margin-top: 0;
    margin-bottom: 20px;
    @media (max-width: 690px) {
      align-self: center;
    }
  }
`;

const DisplayWorkouts = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 690px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const WorkoutCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: calc(100% / 7);
  align-items: center;
  height: 120px;
  padding: 5px 0;
  color: rgb(64, 88, 101);

  h4 {
    align-self: center;
    margin-bottom: 0;
    margin-top: 0;
  }

  p {
    font-weight: 600;
    margin: 0 auto;
  }
  @media (max-width: 690px) {
    width: 100%;
    max-width: 100%;
  }
`;
const EmptyWorkoutCard = styled(WorkoutCard)`
  padding: 5px 0;
`;

const GrayWorkoutCard = styled(WorkoutCard)`
  background-color: rgb(43, 58, 66, 0.1);
  cursor: pointer;
`;

const EmptyGrayWorkoutCard = styled(GrayWorkoutCard)`
  padding: 5px 0;
`;
