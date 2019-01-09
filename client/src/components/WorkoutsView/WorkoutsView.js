import React from "react";
import SideNav from "../SideNav";
import EditWorkout from "./EditWorkout";
import WorkoutCategoryList from "./WorkoutCategoryList";

class WorkoutsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        workoutsview
        <SideNav />
        <EditWorkout />
        <WorkoutCategoryList />
      </div>
    );
  }
}

export default WorkoutsView;
