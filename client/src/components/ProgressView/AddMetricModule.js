import React, { useState } from 'react';
import styled from 'styled-components';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddMetricModule = ({setAddMetric, metrics}) => {

    const [weight, setWeight] = useState('')
    const [hips, setHips] = useState('')
    const [waist, setWaist] = useState('')
    const [armLeft, setArmLeft] = useState('')
    const [armRight, setArmRight] = useState('')
    const [legLeft, setLegLeft] = useState('')
    const [legRight, setLegRight] = useState('')
    const [date, setDate] = useState(new Date())
    const [error, setError] = useState('')

    const dateStringParser = date => {
    
      date = date.split("T")[0].split('-');
  
      const newDate = date[0] + "/" + date[1] + "/" + date[2];
  
      return new Date(newDate);
    };

    const dateFormat = d => {
      let month = d.getMonth() + 1;
      let day = d.getDate();
    
      if (day < 10) {
        day = '0' + day;
      }
    
      if (month < 10) {
        month = '0' + month;
      }
    
      return `${d.getFullYear()}-${month}-${day}`
    };

    const addMetric = () => {

    }

    const changeDate = (nDate) => {
      const dates = metrics.map(m => dateFormat(dateStringParser(m.date)));

      if (dates.includes(dateFormat(nDate))){
        setError('Metric for date already exists');
        return
      }
      setDate(nDate);
    }


    return (
        <MetricFormContainer>
          <MetricForm>
            <StyledInput type="text" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} />
            <StyledInput type="text" placeholder="Hips" value={hips} onChange={e => setHips(e.target.value)} />
            <StyledInput type="text" placeholder="Waist" value={waist} onChange={e => setWaist(e.target.value)} />
            <StyledInput type="text" placeholder="ArmLeft" value={armLeft} onChange={e => setArmLeft(e.target.value)} />
            <StyledInput type="text" placeholder="ArmRight" value={armRight} onChange={e => setArmRight(e.target.value)} />
            <StyledInput type="text" placeholder="LegLeft" value={legLeft} onChange={e => setLegLeft(e.target.value)} />
            <StyledInput type="text" placeholder="LegRight" value={legRight} onChange={e => setLegRight(e.target.value)} />
            <StyledDatePicker
              selected={date}
              onChange={changeDate}
            />

            <ModuleActions>
              <button type="button" onClick={() => setAddMetric(false)}>
                Cancel
              </button>
              <button type="button">Submit</button>
            </ModuleActions>
          </MetricForm>
        </MetricFormContainer>
    );
}

export default AddMetricModule;

// react-datepicker-ignore-onclickoutside

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  border: 1px solid rgba(0,0,0,0.45);
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
  padding: 30px 40px;
`;
