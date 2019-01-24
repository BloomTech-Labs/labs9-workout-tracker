import React, { useState, useContext } from "react";
import { Store } from '../../index';
import styled from "styled-components";
import requireAuth from "../../requireAuth";

import ProgressGraph from "./ProgressGraph";
import AddMetricModule from './AddMetricModule';
import ProgressDayView from './ProgressDayView';

const ProgressView = props => {
  const { state } = useContext(Store)
  const { metrics } = state || [];

  const [addMetric, setAddMetric] = useState(false);

  return (
    <ProgressViewStyle>
      <ProgressAction>
        <StyledButton onClick={() => setAddMetric(true)}>
          Add Metric
        </StyledButton>
      </ProgressAction>

      {metrics && !metrics.length ? (
        <h2>Add metrics to view progress</h2>
      ) : (
        <>
          <ProgressGraph />
          <ProgressDayView/>
        </>
      )}

      {addMetric ? (<AddMetricModule setAddMetric={setAddMetric} />) : null}
    </ProgressViewStyle>
  );
};

export default requireAuth(ProgressView);

const StyledButton = styled.button`
  width: 100px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.white};
  cursor: pointer;
`;

const ProgressAction = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: flex-end;
`;

const ProgressViewStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 74px;
  width: 100%;
  padding: 0px 30px;
`;
