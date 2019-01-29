import React, { useContext, useState } from "react";
import axios from "axios";
import firebase from "firebase";
import { Store } from "../../../index";
import { dateFormat} from "../../../shared";
import {
  StyledError,
  ModuleActions,
  CancelButton,
  SubmitButton
} from "./Style";
import Input from '../../../shared/Input';
import FormModal from '../../../shared/FormModal';

const AddMetric = () => {
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

  const addMetric = async e => {
    e.preventDefault();

    const dates = state.metrics.map(m => dateFormat(new Date(m.date)));

    if (dates.includes(dateFormat(currentMetric.date))) {
      setError("Metric for date already exists");
      return;
    }

    const token = await firebase.auth().currentUser.getIdToken();

    const res = await axios.post(
      "https://fitmetrix.herokuapp.com/api/progress/metrics/create/",
      { currentMetric, date: dateFormat(currentMetric.date) },
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (res.status === 201) {
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
    }
  };

  const changeDate = nDate => {
    const dates = state.metrics.map(m => dateFormat(new Date(m.date)));


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
    <FormModal 
      onSubmit={addMetric}
      closeModal={() => dispatch({ type: "SHOW_METRIC_FORM" })}
      title={"Update Progress"}
    >
      <Input
        label="Date"
        name="Date"
        size="responsive"
        onChange={changeDate}
        value={date}
        type="calendar"
      />
      <Input
        placeholder="Weight"
        label="Weight"
        value={weight}
        name="weight"
        size="responsive"
        onChange={e => setMetric(e)}
      />
      <Input
        placeholder="Hips"
        label="Hips"
        value={hips}
        name="hips"
        size="responsive"
        onChange={e => setMetric(e)}
      />
      <Input
        placeholder="Waist"
        label="Waist"
        value={waist}
        name="waist"
        size="responsive"
        onChange={e => setMetric(e)}
      />
      <Input
        placeholder="Arm Left"
        label="Arm Left"
        value={arm_left}
        name="arm_left"
        size="responsive"
        onChange={e => setMetric(e)}
      />
      <Input
        placeholder="Arm Right"
        label="Arm Right"
        value={arm_right}
        name="arm_right"
        size="responsive"
        onChange={e => setMetric(e)}
      />
      <Input
        placeholder="Leg Left"
        label="Leg Left"
        value={leg_left}
        name="leg_left"
        size="responsive"
        onChange={e => setMetric(e)}
      />
      <Input
        placeholder="Leg Right"
        label="Leg Right"
        value={leg_right}
        name="leg_right"
        size="responsive"
        onChange={e => setMetric(e)}
      />
      {error !== "" ? <StyledError>{error}</StyledError> : null}
      <ModuleActions>
        <CancelButton
          type="button"
          onClick={() => dispatch({ type: "SHOW_METRIC_FORM" })}
        >
          Cancel
        </CancelButton>
        <SubmitButton type="submit">Submit</SubmitButton>
      </ModuleActions>
    </FormModal>
  );
};

export default AddMetric;
