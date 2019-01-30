import React, { useContext } from "react";
import { Store } from "../../index";
import styled from "styled-components";
import requireAuth from "../../requireAuth";

import ProgressGraph from "./ProgressGraph";
import MetricModule from "./MetricModule";
import ProgressDayView from "./ProgressDayView";

const ProgressView = props => {
  const { state, dispatch } = useContext(Store);
  const { metrics } = state || [];

  return (
    <ProgressViewStyle>

      <ProgressGraph />
      <ProgressDayView />

      {state.showMetricForm ? <MetricModule /> : null}
    </ProgressViewStyle>
  );
};

export default requireAuth(ProgressView);

const ProgressViewStyle = styled.div`
width: 100%;
`;
