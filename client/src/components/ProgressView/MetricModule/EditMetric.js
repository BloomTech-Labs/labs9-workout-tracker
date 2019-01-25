import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase";
import { Store } from "../../../index";
import { dateFormat, dateStringParser } from "../../../shared";
import DatePicker from "react-datepicker";
import {
  StyledError,
  StyledInput,
  ModuleActions,
  MetricFormContainer,
  MetricForm
} from "./Style";

const EditMetric = () => {
  const { state, dispatch } = useContext(Store);
  const [error, setError] = useState("");

  const [currentMetric, setCurrentMetric] = useState({
    weight: "",
    hips: "",
    waist: "",
    arm_right: "",
    arm_left: "",
    leg_right: "",
    leg_left: "",
    date: new Date()
  });

  useEffect(
    () => {
      const editMetric = state.editMetric;
      if (editMetric !== null) {
        setCurrentMetric({
          weight: editMetric.weight,
          hips: editMetric.hips,
          waist: editMetric.waist,
          arm_right: editMetric.arm_right,
          arm_left: editMetric.arm_left,
          leg_right: editMetric.leg_right,
          leg_left: editMetric.leg_left,
          date: new Date(editMetric.date)
        });
      }
    },
    [state.editMetric]
  );

  const editMetric = async e => {
    e.preventDefault();

    const token = await firebase.auth().currentUser.getIdToken();

    const res = await axios.put(
      `https://fitmetrix.herokuapp.com/api/progress/metrics/edit/${
        state.editMetric.id
      }`,
      { ...currentMetric },
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (res.status === 200) {
      const nMetrics = await axios.get(
        "https://fitmetrix.herokuapp.com/api/progress/metrics/get",
        {
          headers: {
            Authorization: token
          }
        }
      );

      dispatch({
        type: "UPDATE_METRICS",
        payload: nMetrics.data
      });
      dispatch({ type: "SHOW_METRIC_FORM" });
      dispatch({ type: "RESET_EDIT_METRIC" });
    }
  };

  const changeDate = nDate => {
    const dates = state.metrics.map(m => dateFormat(dateStringParser(m.date)));

    if (dates.includes(dateFormat(nDate))) {
      setError("Metric for date already exists");
      return;
    }
    setCurrentMetric({ ...currentMetric, date: nDate });
    setError("");
  };

  const setMetric = e => {
    const name = e.target.name;
    const value = e.target.value;

    setCurrentMetric({ ...currentMetric, [name]: value });
  };

  const {
    weight,
    hips,
    waist,
    arm_right,
    arm_left,
    leg_right,
    leg_left,
    date
  } = currentMetric;

  return (
    <MetricFormContainer>
      <MetricForm onSubmit={e => editMetric(e)}>
        <StyledInput
          type="text"
          placeholder="Weight"
          value={weight}
          name="weight"
          onChange={e => setMetric(e)}
          required
        />
        <StyledInput
          type="text"
          placeholder="Hips"
          value={hips}
          name="hips"
          onChange={e => setMetric(e)}
          required
        />
        <StyledInput
          type="text"
          placeholder="Waist"
          value={waist}
          name="waist"
          onChange={e => setMetric(e)}
          required
        />
        <StyledInput
          type="text"
          placeholder="ArmLeft"
          value={arm_left}
          name="arm_left"
          onChange={e => setMetric(e)}
          required
        />
        <StyledInput
          type="text"
          placeholder="ArmRight"
          value={arm_right}
          name="arm_right"
          onChange={e => setMetric(e)}
          required
        />
        <StyledInput
          type="text"
          placeholder="LegLeft"
          value={leg_left}
          name="leg_left"
          onChange={e => setMetric(e)}
          required
        />
        <StyledInput
          type="text"
          placeholder="LegRight"
          value={leg_right}
          name="leg_right"
          onChange={e => setMetric(e)}
          required
        />
        <DatePicker selected={date} onChange={changeDate} disabled/>
        {error !== "" ? <StyledError>{error}</StyledError> : null}
        <ModuleActions>
          <button
            type="button"
            onClick={() => dispatch({ type: "SHOW_METRIC_FORM" })}
          >
            Cancel
          </button>
          <button type="submit">Edit</button>
        </ModuleActions>
      </MetricForm>
    </MetricFormContainer>
  );
};

export default EditMetric;
