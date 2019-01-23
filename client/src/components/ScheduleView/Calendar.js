/* eslint-disable no-loop-func */
import React from "react";
import dateFns from "date-fns";
import AddWorkout from "./AddWorkout";
import WorkoutDetails from "./WorkoutDetails";
import "./Calendar.css";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      dateSelected: false,
      datePopulated: false,
      selectedDate: null
    };
  }

  renderHeader() {
    const dateFormat = "MMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "ddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
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


    const renderButton = (key) => {
      console.log(key)
      if(key.toString().includes("Sun")) {
        return <button>Duplicate</button>
      }
    }

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
          <>
            {/* checking if scheduleWorkouts is defined */}
            {this.props.scheduleWorkouts === undefined ? 
            
            // IF no scheduled workouts, right now the cells don't render. Need to decide what to do here.
            null : (
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate)
                    ? "selected"
                    : ""
                }`}
                key={day}
                sworkout={
                  this.props.scheduleWorkouts.map(sworkout => {
                    // returns the title of the scheduled workout if it matches matchedDate
                    const splitDate = sworkout.date.split("T")[0]
                    return splitDate === matchedDate
                      ? sworkout
                      : null;
                  })
                }
                onClick={
                  //Check whether the matchedDate is inside of scheduled workouts
                  // using arrayContains method
                  arrayContains(matchedDate, this.props.scheduleWorkouts) ===
                  true
                    ? //if so, runs onDateClick with true
                      () => {
                        this.onDateClick(dateFns.parse(cloneDay), true);
                      }
                    : //else runs onDateClick with false
                      () => {
                        this.onDateClick(dateFns.parse(cloneDay), false);
                      }
                }
              >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
                <span>
                  {//maps through scheduleworkouts
                  this.props.scheduleWorkouts.map(sworkout => {
                    // returns the title of the scheduled workout if it matches matchedDate
                    const splitDate = sworkout.date.split("T")[0]
                    return splitDate === matchedDate
                      ? sworkout.title
                      : null;
                  })}
                </span>
                {renderButton(day)}
              </div>
            )}
          </>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      console.log("DAYS:", days)
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day, isPopulated) => {
    if (this.state.selectedDate === null) {
      this.setState({
        selectedDate: day,
        datePopulated: isPopulated,
        dateSelected: true
      });
    } else {
      this.setState({
        selectedDate: null,
        datePopulated: false,
        dateSelected: false
      });
    }
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar-div">
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
        {/* if no date is selected, return null */}
        {this.state.dateSelected !==
        true ? null : 
        // if date is selected, check if date is populated and return component based on that
        this.state.datePopulated === true ? (
          <div>
          {/* bug: upon re-render, seems to bring in entire scheduleWorkouts array */}
            <WorkoutDetails  selectedDate={this.state.selectedDate} dispatch={this.props.dispatch} scheduleWorkouts={this.props.scheduleWorkouts} />
          </div>
        ) : (
          <div>
            <AddWorkout
              workouts={this.props.user.workouts}
              scheduleWorkouts={this.props.user.scheduleWorkouts}
              selectedDate={this.state.selectedDate}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Calendar;
