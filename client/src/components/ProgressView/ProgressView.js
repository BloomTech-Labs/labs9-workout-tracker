import React, { useState, useEffect } from "react";
import styled from "styled-components";
import requireAuth from "../../requireAuth";

import ProgressGraph from "./ProgressGraph";
import ProgressHeader from "./ProgressHeader";

const ProgressView = props => {
  const { metrics } = props.user || [];
  const [type, setType] = useState("weight");
  const [addMetric, setAddMetric] = useState(false);

  useEffect(() => {
    props.getUserInfo();
  }, []);

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
          <ProgressInfo>
            <ProgressTitle>Progress</ProgressTitle>
            <ProgressHeader metrics={metrics} setType={setType} />
          </ProgressInfo>
          <GraphContainer>
            <ProgressGraph metrics={metrics} type={type} />
            <SelectedMetric>
              {type
                .toUpperCase()
                .split("_")
                .join(" ")}
            </SelectedMetric>
          </GraphContainer>
        </>
      )}
      {addMetric ? (
        <MetricFormContainer>
          <MetricForm>
            <input type="text" />

            <ModuleActions>
              <button type="button" onClick={() => setAddMetric(false)}>
                Cancel
              </button>
              <button type="button">Submit</button>
            </ModuleActions>
          </MetricForm>
        </MetricFormContainer>
      ) : null}
    </ProgressViewStyle>
  );
};

export default requireAuth(ProgressView);

const ModuleActions = styled.div`
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`;

const MetricFormContainer = styled.form`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const MetricForm = styled.form`
  width: 340px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectedMetric = styled.h2`
  margin: 10px 0px;
`;

const ProgressTitle = styled.h2`
  margin: 10px 0px;
`;

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

const ProgressInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
