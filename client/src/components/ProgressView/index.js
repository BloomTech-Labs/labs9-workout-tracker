import React, { useContext } from "react";
import { Store } from "../../index";
import styled, { css } from "styled-components";
import requireAuth from "../../requireAuth";

import ProgressGraph from "./ProgressGraph";
import MetricModule from "./MetricModule";
import ProgressDayView from "./ProgressDayView";

const ProgressView = props => {
  const { state, dispatch } = useContext(Store);
  const { metrics } = state || [];

  return (
    <ProgressViewStyle showScrollBar={state.showMetricForm}>
      <h1>Progress</h1>
      {!metrics || !metrics.length ? (
        <StyledError>
          No progress to be shown. Let's start by adding your initial metrics!
        </StyledError>
      ) : (
        <ProgressGraph />
      )}
      <ProgressDayView />

      {state.showMetricForm ? <MetricModule /> : null}
    </ProgressViewStyle>
  );
};

export default requireAuth(ProgressView);

const StyledError = styled.p`
  color: ${props => props.theme.primaryDark};
  font-size: 1.8rem;
  font-weight: 600;
`;

const ProgressViewStyle = styled.div`
  width: 100%;
  padding: 0px 20px;
  max-width: 1040px;
  h1 {
    left: 20px;
    text-align: left;
  }
`;
