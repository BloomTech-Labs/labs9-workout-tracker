import React from "react";
import SideNav from "../SideNav";
import EditWorkout from "./EditWorkout";
import WorkoutCategoryList from "./WorkoutCategoryList";
import styled from "styled-components";

const WorkoutsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
`;

class WorkoutsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: []
    };
  }

  componentDidMount() {
    this.setState({ workouts: this.props.workouts });
  }

  render() {
    return (
      <WorkoutsViewStyle>
        <SideNav />
        <EditWorkout />
        <WorkoutCategoryList />
      </WorkoutsViewStyle>
    );
  }
}

export default WorkoutsView;
