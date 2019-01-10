import React from "react";
import SideNav from "../SideNav";
import Calendar from "./Calendar";
import ScheduleWorkoutList from "./ScheduleWorkout/ScheduleWorkoutList";
import AddWorkout from "./AddWorkout";
import WorkoutDetails from "./WorkoutDetails";
import styled from "styled-components";

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

  selectDate() {
    console.log(this)
    console.log(this.state)
    // this.setState({dateSelected:true})
  }

  render() {
    return (
      <ScheduleViewStyle>
        <SideNav />
        <Calendar dateSelected={this.state.dateSelected} selectDate={this.selectDate}/>
        <ScheduleWorkoutList scheduleWorkouts={this.props.scheduleWorkouts} />
        {
          this.state.dateSelected === true ?
          <AddWorkout
            workouts={this.props.workouts}
            scheduleWorkouts={this.props.scheduleWorkouts}
          />
          :
          null
        }
        <WorkoutDetails
          scheduleWorkouts={this.props.scheduleWorkouts}
        />
      </ScheduleViewStyle>
    );
  }
}

const ScheduleViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
`;
export default ScheduleView;
