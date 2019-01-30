import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase";
import { Store } from "../../../index";
import { dateFormat, dateStringParser } from "../../../shared";
import {
  StyledError,
  DeleteButton,
  Row
} from "./Style";
import Input from '../../../shared/Input';
import FormModal from '../../../shared/FormModal';
import Button from '../../../shared/Button';

const EditMetric = () => {
  const { state, dispatch } = useContext(Store);
  const [error, setError] = useState("");

  const [currentMetric, setCurrentMetric] = useState({
    id: null,
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
          id: editMetric.id,
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

  const closeModal = () => {
    dispatch({ type: "SHOW_METRIC_FORM" })
    dispatch({ type: "RESET_EDIT_METRIC" })
  }
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

  const [confirmDelete, setConfirmDelete] = useState(false);


  const deleteMetric = async e => {
    e.preventDefault();

    if(confirmDelete === false) {
      setConfirmDelete(true)
      return
    }

    const token = await firebase.auth().currentUser.getIdToken()
    const deleteRes = await axios.delete(
        `https://fitmetrix.herokuapp.com/api/progress/metrics/delete/${currentMetric.id}`,
        {
            headers: {
              Authorization: token
            }
        }
    );


    if (deleteRes.status === 200) {
        const newMetrics = await axios.get('https://fitmetrix.herokuapp.com/api/progress/metrics/get',
        {
            headers: {
              Authorization: token
            }
        })
        dispatch({type: "UPDATE_METRICS", payload: newMetrics.data})
    }

    setConfirmDelete(false);
    closeModal();
  }

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
      onSubmit={editMetric}
      closeModal={e => closeModal()}
      title={"Edit Progress"}
      size="small"
    >
      <Button type="button" scheme="delete" size="responsive" onClick={(e) => deleteMetric(e)}>{confirmDelete ? "Click to confirm" : "Delete"}</Button>
      <Row>
        <Input
          label="Date"
          name="Date"
          size="medium"
          onChange={changeDate}
          value={date}
          type="calendar"
          isDisabled="true"
          />
        <Input
          placeholder="Weight"
          label="Weight"
          value={weight}
          size="medium"
          name="weight"
          onChange={e => setMetric(e)}
          />
      </Row>

      <Row>
        <Input
          placeholder="Hips"
          label="Hips"
          value={hips}
          name="hips"
          size="medium"
          onChange={e => setMetric(e)}
        />
        <Input
          placeholder="Waist"
          label="Waist"
          value={waist}
          name="waist"
          size="medium"
          onChange={e => setMetric(e)}
        />
      </Row>

      <Row>
        <Input
          placeholder="Arm Left"
          label="Arm Left"
          value={arm_left}
          name="arm_left"
          size="medium"
          onChange={e => setMetric(e)}
          />
        <Input
          placeholder="Arm Right"
          label="Arm Right"
          value={arm_right}
          name="arm_right"
          size="medium"
          onChange={e => setMetric(e)}
        />
      </Row>

      <Row>
        <Input
          placeholder="Leg Left"
          label="Leg Left"
          value={leg_left}
          name="leg_left"
          size="medium"
          onChange={e => setMetric(e)}
          />
        <Input
          placeholder="Leg Right"
          label="Leg Right"
          value={leg_right}
          name="leg_right"
          size="medium"
          onChange={e => setMetric(e)}
          />
      </Row>
      {error !== "" ? <StyledError>{error}</StyledError> : null}
      <Button type="submit" size="responsive">Submit</Button>
      <Button type="button" scheme="cancel" size="responsive" onClick={e => closeModal()}>Cancel</Button>
    </FormModal>
  );
};

export default EditMetric;
