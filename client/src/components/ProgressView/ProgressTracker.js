import React from "react";
import styled from "styled-components";

const ProgressTrackerStyle = styled.div`
  border: 1px solid red
  height: 200px;
`;

const ProgressTracker = props => {
  return <ProgressTrackerStyle>Progress Tracker</ProgressTrackerStyle>;
};

export default ProgressTracker;
