import React from "react";
import styled from "styled-components";

const ProgressView = props => {
  const { metrics } = props.user;
  return (
    <ProgressViewStyle>
      <ProgressAction>
        <StyledButton>Add</StyledButton>
      </ProgressAction>
      <ProgressInfo>
        <Metric>{metrics[0].weight}</Metric>
        <Metric>{metrics[0].waist}</Metric>
        <Metric>{metrics[0].hips}</Metric>
      </ProgressInfo>
    </ProgressViewStyle>
  );
};

export default ProgressView;

const StyledButton = styled.button`
  width: 100px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.white};
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
  font-family: "Anton", sans-serif;
  position: absolute;
  left: 0;
  top: 74px;
  width: 100%;
  padding: 0px 30px;
`;

const ProgressInfo = styled.div`
  width: 100%;
  height: 100px;
  border: solid 1px black;
  display: flex;
  justify-content: space-between;
`;

const Metric = styled.div`
  width: 100px;
  height: 100px;
`;

const SubmitProgress = styled.form``;
