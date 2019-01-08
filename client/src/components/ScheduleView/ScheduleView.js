import React from "react";
import SideNav from '../SideNav';
import Calendar from './Calendar';
import ScheduleWorkoutList from './ScheduleWorkout/ScheduleWorkoutList';
import AddWorkout from './AddWorkout';
import WorkoutDetails from './WorkoutDetails';

class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>ScheduleView
      <SideNav/>
      <Calendar/>
      <ScheduleWorkoutList/>
      <AddWorkout/>
      <WorkoutDetails/>
      </div>;
  }
}

export default ScheduleView;
