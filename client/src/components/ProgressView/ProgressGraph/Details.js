import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import { Store } from '../../../index';
import { Radar } from 'react-chartjs-2';

const Details = () => {
    const {state, dispatch} = useContext(Store)

    const type = state.graphType;
    const metrics = state.metrics;

    const getData = () => {
      let earliest = { date: null, index: null };
      let latest = { date: null, index: null };
      
      const metrics = state.metrics;
      if (!metrics) return [];
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

      let radarData = [];
      const keys = Object.keys(metrics[0]);

      for (let i = 1; i < 8; i++) {
        if (i > 1 || i < 8){
          const value = metrics[latest.index][keys[i]] - metrics[earliest.index][keys[i]];

          radarData.push(value > 0 ? value : 0)
        }
      }

      return  radarData;
    }

    const radarData = {
      labels: ["Weight", "Hips", "Waist", "Arm Left", "Arm Right", "Leg Left", "Leg Right"],
      datasets: [{
        label: 'Progress',
        borderColor: 'rgba(253, 143, 37, 1)',
        backgroundColor: 'rgba(253, 143, 37, 0.4)',
        pointBackgroundColor: 'rgba(253, 143, 37, 1)',
        // data: [10.62, 20.57, 37, 20.01, 10.5, 20.01, 10.5]
        data: getData()
    }]}


    const renderDetails = () => {
        if (!metrics) return (<span></span>);
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
                <Row>
                  <h3>Progress:</h3>
                  <span>{Math.round(progress * 100) /100}</span>
                </Row>
                <Row>
                  <h3>Current: </h3>
                  <span>{metrics[latest.index][type]}</span>
                </Row>
                <RadarContianer>
                  <Radar data={radarData}/>
                </RadarContianer>
            </DetailsContainer>
        );
    };

    return renderDetails();
}



export default Details;

const RadarContianer = styled.div`
    width: 375px;
    position: absolute;
    right: -90px;
    top: 137px;
`;

const Row = styled.div`
  display: flex;
  align-items: space-between;
  width: 100%;
  h3 {
    font-size: 18px;
    font-family: 600;
    margin: 0;
  }
  span{
    font-size: 17px;
    font-family: 600;
    margin-left: 20px;
  }
`;


const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  position: relative;
  /* background-color: ${props => props.theme.primaryDark}; */
  color: ${props => props.theme.primaryDark};
  padding: 20px 10px;

  h2 {
      font-size: 20px;
      font-weight: 600;
      text-transform: uppercase;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;
