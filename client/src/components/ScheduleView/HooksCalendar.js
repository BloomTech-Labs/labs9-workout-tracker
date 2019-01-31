/* eslint-disable no-loop-func */
import React, { useContext, useState } from "react";
import { Store } from "../../index";
import dateFns from "date-fns";
import AddWorkout from "./AddWorkout";
import styled from "styled-components";
import WorkoutDetails from "./WorkoutDetails";
import "./Calendar.css";
import FormModal from "../../shared/FormModal";

const HooksCalendar = props => {
  const { state, dispatch } = useContext(Store);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setselectedDate] = useState(null);
  const [datePopulated, setdatePopulated] = useState(false);

  const renderHeader = () => {
    const dateFormat = "MMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "ddd";
    const days = [];

    let startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const dateMatch = "YYYY-MM-DD";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    let matchedDate = "";

    const arrayContains = (str, array) => {
      let populated = false;
      array.forEach(stringObj => {
        if (stringObj.date.split("T")[0] === str) {
          populated = true;
        }
      });
      return populated;
    };

    while (day <= endDate) {
      //Loop through days 1-7
      for (let i = 0; i < 7; i++) {
        //formattedDate to render onto the cell
        formattedDate = dateFns.format(day, dateFormat);
        //matched date to check against scheduled workout date
        matchedDate = dateFns.format(day, dateMatch);
        //create a clone of the day to update selected date when cell is clicked
        const cloneDay = day;

        //pushing into the days array
        days.push(
          <React.Fragment key={`${day}${Math.random()}`}>
            {/* checking if scheduleWorkouts is defined */}
            {state.scheduleWorkouts === undefined ? (
              // IF no scheduled workouts, renders an empty calendar
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate)
                    ? "selected"
                    : ""
                }`}
                key={`${day}${Math.random()}`}
                onClick={() => onDateClick(dateFns.parse(cloneDay), false)}
              >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
              </div>
            ) : (
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate)
                    ? "selected"
                    : ""
                }`}
                key={`${day}${Math.random()}`}
                sworkout={state.scheduleWorkouts.filter(sworkout => {
                  // returns the title of the scheduled workout if it matches matchedDate
                  const splitDate = sworkout.date.split("T")[0];
                  if (splitDate === matchedDate) return sworkout;
                })}
                completed={state.scheduleWorkouts.map(sworkout => {
                  // returns the title of the scheduled workout if it matches matchedDate
                  const splitDate = sworkout.date.split("T")[0];
                  if (splitDate === matchedDate) return sworkout;
                })}
                onClick={
                  //Check whether the matchedDate is inside of scheduled workouts
                  // using arrayContains method
                  arrayContains(matchedDate, state.scheduleWorkouts) === true
                    ? //if so, runs onDateClick with true
                      () => {
                        onDateClick(dateFns.parse(cloneDay), true);
                      }
                    : //else runs onDateClick with false
                      () => {
                        onDateClick(dateFns.parse(cloneDay), false);
                      }
                }
              >
                {//maps through scheduleworkouts
                state.scheduleWorkouts.map(sworkout => {
                  // returns the title of the scheduled workout if it matches matchedDate
                  const splitDate = sworkout.date.split("T")[0];
                  if (splitDate === matchedDate) {
                    if (sworkout.completed === true) {
                      return (
                        <CellDiv key={sworkout.id}>
                          <i
                            className="fas fa-dumbbell completed"
                            key={`${day}${Math.random()}`}
                          />
                          <p className="completed">{sworkout.title}</p>
                        </CellDiv>
                      );
                    } else {
                      return (
                        <CellDiv key={sworkout.id}>
                          <i
                            className="fas fa-dumbbell"
                            key={`${day}${Math.random()}`}
                          />
                          <p>{sworkout.title.substring(0, 13)}...</p>
                        </CellDiv>
                      );
                    }
                  }
                })}
                <span
                  className={`number ${
                    dateFns.isSameDay(day, new Date()) ? "today" : null
                  }`}
                >
                  {formattedDate}
                </span>
                <span className="bg">{formattedDate}</span>
              </div>
            )}
          </React.Fragment>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={`${day}${Math.random()}`}>
          {days}
        </div>
      );

      days = [];
    }
    return (
      <div className="body" key={`${day}${Math.random()}`}>
        {rows}
      </div>
    );
  };

  const onDateClick = (day, isPopulated) => {
    // selecteddate null, dates length =0
    if (selectedDate === null) {
      setselectedDate(day);
      setdatePopulated(isPopulated);
      dispatch({ type: "UPDATE_DATE_SELECTED" });
    } else {
      setselectedDate(null);
      setdatePopulated(isPopulated);
      dispatch({ type: "UPDATE_DATE_SELECTED" });
    }
  };

  const nextMonth = () => {
    setCurrentMonth(dateFns.addMonths(currentMonth, 1));

    // this.setState({
    //   currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    // });
  };

  const prevMonth = () => {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1));

    // this.setState({
    //   currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    // });
  };

  return (
    <div className="calendar-div">
      <h3>Upcoming workouts</h3>
      <DisplayWorkouts>
        {state.scheduleWorkouts.map((sworkout, i) => {
          if (i % 2 === 0 && i < 7) {
            return (
              <div className="gray" key={sworkout.id}>
                <h3>{sworkout.title}</h3>
                <p>{sworkout.category.name}</p>
                <p>{dateFns.format(sworkout.date, "YYYY-MM-DD")}</p>
              </div>
            );
          } else if (i % 2 === 1 && i < 7) {
            return (
              <div key={sworkout.id}>
                <h3>{sworkout.title}</h3>
                <p>{sworkout.category.name}</p>
                <p>{dateFns.format(sworkout.date, "YYYY-MM-DD")}</p>
              </div>
            );
          } else {
            return;
          }
        })}
      </DisplayWorkouts>
      <Legend>
        <i className="fas fa-dumbbell completed" />
        <p>Complete</p>
        <i className="fas fa-dumbbell 3x" />
        <p>Incomplete</p>
      </Legend>
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      {state.dateSelected === false ? null : datePopulated === true ? (
        <WorkoutDetails
          selectedDate={selectedDate}
          currentDay={currentMonth}
          dispatch={dispatch}
          scheduleWorkouts={state.scheduleWorkouts}
          datePopulated={datePopulated}
        />
      ) : (
        <AddWorkout
          workouts={state.workouts}
          scheduleWorkouts={state.scheduleWorkouts}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default HooksCalendar;

const Legend = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  i {
    color: rgb(253, 143, 37);
    margin-left: 4%;
  }
  i.completed {
    color: rgb(64, 88, 101);
    margin-left: 2%;
  }
  p {
    margin: 0 2% 0 1%;
  }
`;

const DisplayWorkouts = styled.div`
 margin-bottom: 20px;
 display:flex;
 align-items:center;

 @media (max-width: 690px) {
   flex-direction:column
  justify-content: center;
}

div {
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width: 70%;
  align-items:center;
  padding: 5px 0;
  
  
  h3 {
    margin-left: 5%;
    margin-top: 7px;
  }
  p {
  }
}
.gray {
  background-color:rgb(43, 58, 66, 0.1);
}
`;

const CellDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  @media (max-width: 690px) {
    justify-content: center;
  }
  i {
    margin-right: 70%;
    margin-top: 5px;
    @media (max-width: 690px) {
      margin: 0;
      align-self: center;
    }
  }
  p {
    font-weight: bold;
    background: rgb(253, 143, 37, 0.8);
    border-radius: 10px;
    margin: 2px auto;
    color: white;
    padding: 1px 5%;
    width: 93%;
    @media (max-width: 690px) {
      display: none;
    }
  }
  p.completed {
    background: rgb(64, 88, 101, 0.8);
  }
`;
