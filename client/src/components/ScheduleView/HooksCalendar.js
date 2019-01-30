/* eslint-disable no-loop-func */
import React, { useContext, useState } from "react";
import { Store } from "../../index";
import dateFns from "date-fns";
import AddWorkout from "./AddWorkout";
import styled from 'styled-components';
import WorkoutDetails from "./WorkoutDetails";
import "./Calendar.css";

const HooksCalendar = props => {
  const { state, dispatch } = useContext(Store);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateSelected, setdateSelected] = useState(false);
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
        console.log(matchedDate)
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
                  if( splitDate === matchedDate) return sworkout;
                })}
                completed= {state.scheduleWorkouts.map(sworkout => {
                  // returns the title of the scheduled workout if it matches matchedDate
                  const splitDate = sworkout.date.split("T")[0];
                  if( splitDate === matchedDate) return sworkout;
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
                    if (splitDate === matchedDate)  {
                      console.log("Match", sworkout)
                      console.log("completed?", sworkout.completed)

                      if (sworkout.completed === true) {
                        return (
                          <CellDiv>
                            <i className="fas fa-dumbbell completed"key={`${day}${Math.random()}`}></i>
                            <p className='completed'>{sworkout.title}</p>
                          </CellDiv>
                        )
                      } else {
                        return (
                          <CellDiv>
                            <i className="fas fa-dumbbell"key={`${day}${Math.random()}`}></i>
                            <p >{sworkout.title}</p>
                          </CellDiv>
                        )
                      }
                    }
                  })}
                <span className="number">{formattedDate}</span>
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
      setdateSelected(true);
    } else {
      setselectedDate(null);
      setdatePopulated(isPopulated);
      setdateSelected(false);
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
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <PopupModalDiv>
          <WorkoutDetails
            selectedDate={selectedDate}
            currentDay = {currentMonth}
            dispatch={dispatch}
            scheduleWorkouts={state.scheduleWorkouts}
            datePopulated ={datePopulated}
          />
        </PopupModalDiv>

    </div>
  );
};

export default HooksCalendar;

const PopupModalDiv = styled.div`
width:40%;
justify-content: space-around;
border-radius: 4px;
`;

const CellDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width:100%;
height:100%;
i {
  margin-right: 70%;
  margin-top:5px;
}
p {
  font-weight:bold;
  background: rgb(253, 143, 37, 0.8);
  border-radius:4px;
  margin: 2px auto; 
  color:white;
  padding: 3px 5%;

}
 p.completed {
  background: rgb(43, 58, 66, 0.8)
}
`;
