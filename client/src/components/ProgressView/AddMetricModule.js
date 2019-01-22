import React, { useState } from 'react';
import styled from 'styled-components';

const AddMetricModule = ({setAddMetric}) => {

    const [weight, setWeight] = useState('')
    const [hips, setHips] = useState('')
    const [waist, setWaist] = useState('')
    const [armLeft, setArmLeft] = useState('')
    const [armRight, setArmRight] = useState('')
    const [legLeft, setLegLeft] = useState('')
    const [legRight, setLegRight] = useState('')


    return (
        <MetricFormContainer>
          <MetricForm>
            <input type="text" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} />
            <input type="text" placeholder="Hips" value={hips} onChange={e => setHips(e.target.value)} />
            <input type="text" placeholder="Waist" value={waist} onChange={e => setWaist(e.target.value)} />
            <input type="text" placeholder="ArmLeft" value={armLeft} onChange={e => setArmLeft(e.target.value)} />
            <input type="text" placeholder="ArmRight" value={armRight} onChange={e => setArmRight(e.target.value)} />
            <input type="text" placeholder="LegLeft" value={legLeft} onChange={e => setLegLeft(e.target.value)} />
            <input type="text" placeholder="LegRight" value={legRight} onChange={e => setLegRight(e.target.value)} />

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
