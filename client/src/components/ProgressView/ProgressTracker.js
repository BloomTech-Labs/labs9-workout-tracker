import React from "react";
import styled from "styled-components";

const ProgressTrackerStyle = styled.div``;

class ProgressTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <ProgressTrackerStyle>Progress Tracker</ProgressTrackerStyle>;
  }
}

export default ProgressTracker;
