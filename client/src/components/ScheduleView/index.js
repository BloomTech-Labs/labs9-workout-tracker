import React from "react";
import Calendar from "./Calendar";
import styled from "styled-components";
import requireAuth from "../../requireAuth";

const ScheduleView = props => {
  return (
    <ScheduleViewStyle>
      <h1>My Scheduled Workouts</h1>
      <Calendar history={props.history} />
    </ScheduleViewStyle>
  );
};

const ScheduleViewStyle = styled.div`
  width: 95%;
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  position: absolute;
  h1 {
    align-self: baseline;

    @media (max-width: 690px) {
      align-self: center;
    }
  }
  @media (max-width: 690px) {
    width: 100%;
    padding: 0;
  }
`;

export default requireAuth(ScheduleView);
