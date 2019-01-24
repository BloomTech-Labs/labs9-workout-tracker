import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import firebase from "firebase";
import { Store } from '../../index';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddMetricModule = ({ setAddMetric }) => {

  const { state, dispatch } = useContext(Store);
 
  const [weight, setWeight] = useState("");
  const [hips, setHips] = useState("");
  const [waist, setWaist] = useState("");
  const [armLeft, setArmLeft] = useState("");
  const [armRight, setArmRight] = useState("");
  const [legLeft, setLegLeft] = useState("");
  const [legRight, setLegRight] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");

  const dateStringParser = date => {
    date = date.split("T")[0].split("-");

    const newDate = date[0] + "/" + date[1] + "/" + date[2];

    return new Date(newDate);
  };

  const dateFormat = d => {
    let month = d.getMonth() + 1;
    let day = d.getDate();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    return `${d.getFullYear()}-${month}-${day}`;
  };

  const changeDate = nDate => {
    const dates = state.metrics.map(m => dateFormat(dateStringParser(m.date)));

    if (dates.includes(dateFormat(nDate))) {
      setError("Metric for date already exists");
      return;
    }
    setDate(nDate);
    setError("");
  };

  const addMetric = async (e) => {
    e.preventDefault();

    const dates = state.metrics.map(m => dateFormat(dateStringParser(m.date)));

    if (dates.includes(dateFormat(date))) {
      setError("Metric for date already exists");
      return;
    }

    const token = await firebase.auth().currentUser.getIdToken()

    const res = await axios.post('https://fitmetrix.herokuapp.com/api/progress/metrics/create/',
      {
        weight,
        hips,
        waist,
        arm_right: armRight,
        arm_left: armLeft,
        leg_right: legRight,
        leg_left: legLeft,
        date: dateFormat(date)
      },
      {
        headers: {
          Authorization: token
        }
      }
    )

    if (res.status === 201) {
      const nMetrics = await axios.get(
        'https://fitmetrix.herokuapp.com/api/progress/metrics/get',
        {
          headers: {
            Authorization: token
          }
        }
      )
      
      dispatch({
        type: "UPDATE_METRICS",
        payload: nMetrics.data
      })
    }

  };

  const editMetric = async (e) => {
    e.preventDefault();

  }

  useEffect(() => {
    const editMetric = state.editMetric
    if(editMetric !== null) {
      setWeight(editMetric.weight);
      setHips(editMetric.hips);
      setWaist(editMetric.waist);
      setArmLeft(editMetric.arm_left);
      setArmRight(editMetric.arm_right);
      setLegLeft(editMetric.leg_left);
      setLegRight(editMetric.leg_right);
      setDate(new Date(editMetric.date))
    }
  }, [state.editMetric])

  const renderForm = () => {

    const editMetric = state.editMetric;

    if (editMetric === null) {
      return (
        <MetricFormContainer>
          <MetricForm onSubmit={e => addMetric(e)}>
            <StyledInput
              type="text"
              placeholder="Weight"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              required
            />
            <StyledInput
              type="text"
              placeholder="Hips"
              value={hips}
              onChange={e => setHips(e.target.value)}
              required
            />
            <StyledInput
              type="text"
              placeholder="Waist"
              value={waist}
              onChange={e => setWaist(e.target.value)}
              required
            />
            <StyledInput
              type="text"
              placeholder="ArmLeft"
              value={armLeft}
              onChange={e => setArmLeft(e.target.value)}
              required
            />
            <StyledInput
              type="text"
              placeholder="ArmRight"
              value={armRight}
              onChange={e => setArmRight(e.target.value)}
              required
            />
            <StyledInput
              type="text"
              placeholder="LegLeft"
              value={legLeft}
              onChange={e => setLegLeft(e.target.value)}
              required
            />
            <StyledInput
              type="text"
              placeholder="LegRight"
              value={legRight}
              onChange={e => setLegRight(e.target.value)}
              required
            />
            <StyledDatePicker selected={date} onChange={changeDate} />
            {error !== "" ? <StyledError>{error}</StyledError> : null}
            <ModuleActions>
              <button type="button" onClick={() => dispatch({type:'SHOW_METRIC_FORM'})}>
                Cancel
              </button>
              <button type="submit">Submit</button>
            </ModuleActions>
          </MetricForm>
        </MetricFormContainer>
      );
    }

    return (
      <MetricFormContainer>
        <MetricForm onSubmit={e => editMetric(e)}>
          <StyledInput
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="Hips"
            value={hips}
            onChange={e => setHips(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="Waist"
            value={waist}
            onChange={e => setWaist(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="ArmLeft"
            value={armLeft}
            onChange={e => setArmLeft(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="ArmRight"
            value={armRight}
            onChange={e => setArmRight(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="LegLeft"
            value={legLeft}
            onChange={e => setLegLeft(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="LegRight"
            value={legRight}
            onChange={e => setLegRight(e.target.value)}
            required
          />
          <StyledDatePicker selected={date} onChange={changeDate} disabled/>
          {error !== "" ? <StyledError>{error}</StyledError> : null}
          <ModuleActions>
            <button type="button" onClick={() => dispatch({type:'SHOW_METRIC_FORM'})}>
              Cancel
            </button>
            <button type="submit">Edit</button>
          </ModuleActions>
        </MetricForm>
      </MetricFormContainer>
    );
  }

  return renderForm();
};

export default AddMetricModule;

const StyledError = styled.div`
  color: red;
  font-size: 16px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.45);
  padding: 0px 15px;
  outline: none;
  font-size: 18px;
`;

const ModuleActions = styled.div`
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`;

const MetricFormContainer = styled.div`
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
  padding: 30px 40px;
`;

