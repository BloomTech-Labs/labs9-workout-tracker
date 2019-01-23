import React, { useState, useEffect } from "react";
import styled from "styled-components";
import requireAuth from "../../requireAuth";
import axios from "axios";

import ProgressGraph from "./ProgressGraph";
import AddMetricModule from './AddMetricModule';
import ProgressDayView from './ProgressDayView';

const ProgressView = props => {
  const { metrics } = props.user || [];
  const [addMetric, setAddMetric] = useState(false);
  //hooks to update state of each individual metric when adding a new metric
  const [weight, setWeight] = useState("");
  const [hips, setHips] = useState();
  const [waist, setWaist] = useState();
  const [arm_right, setRightArm] = useState();
  const [arm_left, setLeftArm] = useState();
  const [leg_right, setRightLeg] = useState();
  const [leg_left, setLeftLeg] = useState();

  useEffect(() => {
    props.getUserInfo();
  }, []);
  //handlers for each individual metric
  const weightHandler = e => {
    setWeight(e.target.value);
  };
  const hipsHandler = e => {
    setHips(e.target.value);
  };
  const waistHandler = e => {
    setWaist(e.target.value);
  };
  const rightArmHandler = e => {
    setRightArm(e.target.value);
  };
  const leftArmHandler = e => {
    setLeftArm(e.target.value);
  };
  const rightLegHandler = e => {
    setRightLeg(e.target.value);
  };
  const leftLegHandler = e => {
    setLeftLeg(e.target.value);
  };

  // handler to submit metrics to database
  const submitMetricsHandler = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");
    // object to be posted to db
    const newMetricsSet = {
      weight,
      waist,
      hips,
      arm_left,
      arm_right,
      leg_left,
      leg_right,
      date: "2019-01-23T00:00:00.000Z" //needs set to a timestamp. Due to formatting of date, we hard-coded the date in
    };
    console.log(newMetricsSet);
    if (token !== undefined) {
      const res = await axios
        .post(
          "https://fitmetrix.herokuapp.com/api/progress/metrics/create",
          newMetricsSet,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .catch(err => console.log(err));
    }
    //reset the state of each metric
    setWeight("");
    setHips("");
    setWaist("");
    setLeftArm("");
    setRightArm("");
    setLeftLeg("");
    setRightLeg("");
    setAddMetric(false);
  };

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
          <ProgressGraph metrics={metrics} />
          <ProgressDayView metrics={metrics}/>
        </>
      )}
      {addMetric ? (<AddMetricModule setAddMetric={setAddMetric} metrics={metrics}/>) : null}
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
