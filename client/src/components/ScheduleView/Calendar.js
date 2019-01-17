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
      selectedDate:null,
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
      console.log("Dayvar:", day)
    let formattedDate = "";
    let matchedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        matchedDate = dateFns.format(day, dateMatch)
        const cloneDay = day;
        days.push(
          <>
          {this.props.scheduleWorkouts === undefined ? null : (
              this.props.scheduleWorkouts.map(sworkout => {
                if (sworkout.date === matchedDate) {
                  return (
                    <div
                      className={`col cell ${
                        !dateFns.isSameMonth(day, monthStart)
                          ? "disabled"
                          : dateFns.isSameDay(day, selectedDate)
                          ? "selected"
                          : ""
                      }`}
                      key={day}
                      onClick={() => {this.onDateClick(dateFns.parse(cloneDay), true)}}
                    >
                      <span className="number">{formattedDate}</span>
                      <span className="bg">{formattedDate}</span>
                      {sworkout.title}
                    </div>
                  )
                } else {
            return (
              <div
              className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                  ? "disabled"
                  : dateFns.isSameDay(day, selectedDate)
                  ? "selected"
                  : ""
              }`}
              key={day}
              onClick={() => {this.onDateClick(dateFns.parse(cloneDay), false)}}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
            </div>
            )   
            }
              })
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
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day, isPopulated) => {
    if(this.state.selectedDate === null){
    this.setState({
      selectedDate: day,
      datePopulated: isPopulated,
    });
  } else {
    this.setState({
      selectedDate: null,
      datePopulated: false
    });
  }
  };

  //   while (day <= endDate) {
  //     for (let i = 0; i < 7; i++) {
  //       formattedDate = dateFns.format(day, dateFormat);
  //       matchedDate = dateFns.format(day, dateMatch);
  //       const cloneDay = day;


  //       days.push(
  //         <div
  //           className={`col cell ${
  //             !dateFns.isSameMonth(day, monthStart)
  //               ? "disabled"
  //               : dateFns.isSameDay(day, selectedDate)
  //               ? "selected"
  //               : ""
  //           }`}
  //           key={day}
  //           onClick={() => {
  //             this.onDateClick(dateFns.parse(cloneDay) )
  //           }}
  //         >
  //           <span className="number">{formattedDate}</span>
  //           <span className="bg">{formattedDate}</span>
  //           {this.props.scheduleWorkouts !== undefined
  //             ? this.props.scheduleWorkouts.map(sworkout => {
  //                 if (sworkout.date === matchedDate) {
  //                   return <p>{sworkout.title}</p>
  //                 } 
  //               })
  //             : null}
  //         </div>
  //       );
  //       day.startDate = dateFns.addDays(day, 1);
  //     }
  //     rows.push(
  //       <div className="row" key={day}>
  //         {days}
  //       </div>
  //     );
  //     days = [];
  //   }
  //   return <div className="body">{rows}</div>;
  // }

  // onDateClick = (day)=> {
  
  //   if (this.state.selectedDate === null) {
  //     this.setState({
  //       dateSelected: !this.state.dateSelected,
  //       selectedDate: day
  //     }); 
  //   }  else {
  //     this.setState({
  //       selectedDate: null,
  //       dateSelected: !this.state.dateSelected
  //     });
  //   }
  // };

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
        {this.state.dateSelected !== true ? null : this.state.datePopulated ===
          true ? (
          <div>
            <AddWorkout
              workouts={this.props.user.workouts}
              scheduleWorkouts={this.props.user.scheduleWorkouts}
            />
          </div>
        ) : (
          <div>
            <WorkoutDetails scheduleWorkouts={this.props.scheduleWorkouts} />
          </div>
        )}
      </div>
    );
  }
}

export default Calendar;
