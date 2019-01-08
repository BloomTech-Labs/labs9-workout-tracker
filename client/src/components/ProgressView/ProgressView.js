import React from "react";
import SideNav from "../SideNav";
import SubmitProgress from "./SubmitProgress";
import ProgressTracker from "./ProgressTracker";
import ProgressList from "./ProgressList/ProgressList";
class ProgressView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        Progress View
        <SideNav />
        <SubmitProgress />
        <ProgressTracker />
        <ProgressList />
      </div>
    );
  }
}

export default ProgressView;
