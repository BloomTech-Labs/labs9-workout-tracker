import React, { useState } from "react";
import styled from "styled-components";
import requireAuth from '../../requireAuth';

import ProgressGraph from "./ProgressGraph";
import ProgressHeader from "./ProgressHeader";

const ProgressView = props => {
  const { metrics } = props.user || [];
  const [type, setType] = useState("weight");
  return (
    <ProgressViewStyle>
      <ProgressAction>
        <StyledButton>Add Metric</StyledButton>
      </ProgressAction>
      {
        metrics && !metrics.length 
          ? (<h2>Add metrics to view progress</h2>)
          : ( 
            <>
              <ProgressInfo>
                <ProgressTitle>Progress</ProgressTitle>
                <ProgressHeader metrics={metrics} setType={setType} />
              </ProgressInfo>
              <ProgressGraph metrics={metrics} type={type} />
              <SelectedMetric>
                {type
                  .toUpperCase()
                  .split("_")
                  .join(" ")}
              </SelectedMetric>
            </>
          )}
    </ProgressViewStyle>
  );
};

export default requireAuth(ProgressView);

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
  height: 150px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
