import React, { useContext } from 'react';
import styled from 'styled-components'
import { Store } from '../../../index';

const Details = () => {
    const {state, dispatch} = useContext(Store)

    const type = state.graphType;
    const metrics = state.metrics;

    const renderDetails = () => {
        if (!metrics) return (<h1>Laoding</h1>);
        let earliest = { date: null, index: null };
        let latest = { date: null, index: null };
    
        metrics.forEach((m, i) => {
          if (m.date < earliest.date || earliest.date === null) {
            earliest.date = m.date;
            earliest.index = i;
          }
          if (m.date > latest.date || latest.date === null) {
            latest.date = m.date;
            latest.index = i;
          }
        });
        
        const progress = metrics[latest.index][type] - metrics[earliest.index][type];

        return (
            <DetailsContainer>
                <h2>{state.graphType}</h2>
                <span>Progress: {Math.round(progress)}</span>
                <span>Current:  {metrics[earliest.index][type]}</span>
            </DetailsContainer>
        );
    };

    return renderDetails();
}



export default Details;


const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 225px;
  width: 25%;
  background-color: ${props => props.theme.primaryDark};
  color: white;
  padding: 20px 10px;

  h2 {
      font-size: 18px;
      font-weight: 600;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;
