import React from "react";
import Calendar from "./Calendar";
import ScheduleWorkoutList from "./ScheduleWorkout/ScheduleWorkoutList";
import styled from "styled-components";
import requireAuth from "../../requireAuth";

/* I believe this view needs it's own state so that we can render the Addworkout/Workout details
components based on a dateSelected flag, as well as based on whether the date selected is already populated
*/
class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: false
    };
  }

  render() {
    return (
      <ScheduleViewStyle>
        <p style={{display:'none'}}>{this.props.user.email}</p>
        <Calendar dispatch={this.props.dispatch} user={this.props.user} dateSelected={this.state.dateSelected} selectDate={this.selectDate} scheduleWorkouts={this.props.user.scheduleWorkouts} />

        {/* <ScheduleWorkoutList scheduleWorkouts={this.props.scheduleWorkouts} /> */}
      </ScheduleViewStyle>
    );
  }
}

const ScheduleViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  position: absolute;
  top: 74px;
  padding: 0 2%;
  `;



export default requireAuth(ScheduleView);
