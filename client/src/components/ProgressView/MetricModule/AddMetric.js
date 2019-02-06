import React, { useContext, useState } from "react";
import axios from "axios";
import firebase from "firebase";
import styled from 'styled-components';
import { Store } from "../../../index";
import { dateFormat} from "../../../shared";
import {
  StyledError,
  Row
} from "./Style";
import Input from '../../../shared/Input';
import FormModal from '../../../shared/FormModal';
import Button from '../../../shared/Button';

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

    let copyMetrics = {...currentMetric};

    Object.keys(currentMetric).forEach(m => {
      if (currentMetric[m] === "") {
        copyMetrics[m] = 0
      }
    })

    console.log(currentMetric);
    const res = await axios.post(
      "https://fitmetrix.herokuapp.com/api/progress/metrics/create/",
      { ...copyMetrics, date: dateFormat(currentMetric.date) },
      {
        headers: {
          Authorization: token
        }
      }
    );
    console.log(res);

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
      size="small"
    >
      <Row>
        <Input
          label="Date"
          name="Date"
          size="medium"
          onChange={changeDate}
          value={date}
          type="calendar"
          />
        <Input
          placeholder="Weight"
          label="Weight: lbs"
          value={weight}
          size="medium"
          name="weight"
          onChange={e => setMetric(e)}
          />
      </Row>

      <Row>
        <Input
          placeholder="Hips"
          label="Hips: in"
          value={hips}
          name="hips"
          size="medium"
          onChange={e => setMetric(e)}
          isDisabled={state.premium ? 'false' : 'true'}
        />
        <Input
          placeholder="Waist"
          label="Waist: in"
          value={waist}
          name="waist"
          size="medium"
          onChange={e => setMetric(e)}
          isDisabled={state.premium ? 'false' : 'true'}
        />
      </Row>

      <Row>
        <Input
          placeholder="Arm Left"
          label="Arm Left: in"
          value={arm_left}
          name="arm_left"
          size="medium"
          onChange={e => setMetric(e)}
          isDisabled={state.premium ? 'false' : 'true'}
          />
        <Input
          placeholder="Arm Right"
          label="Arm Right: in"
          value={arm_right}
          name="arm_right"
          size="medium"
          onChange={e => setMetric(e)}
          isDisabled={state.premium ? 'false' : 'true'}
        />
      </Row>

      <Row>
        <Input
          placeholder="Leg Left"
          label="Leg Left: in"
          value={leg_left}
          name="leg_left"
          size="medium"
          onChange={e => setMetric(e)}
          isDisabled={state.premium ? 'false' : 'true'}
          />
        <Input
          placeholder="Leg Right"
          label="Leg Right: in"
          value={leg_right}
          name="leg_right"
          size="medium"
          onChange={e => setMetric(e)}
          isDisabled={state.premium ? 'false' : 'true'}
          />
      </Row>
      {error !== "" ? <StyledError>{error}</StyledError> : null}
      <Button type="submit" size="responsive">Submit</Button>
      <ButtonContainer>
        <Button type="button" scheme="cancel" size="responsive" onClick={() => dispatch({ type: "SHOW_METRIC_FORM" })}>Cancel</Button>
      </ButtonContainer>
    </FormModal>
  );
};

export default AddMetric;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
`