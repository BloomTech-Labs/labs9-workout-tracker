import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import { Store } from '../../../index';
import { Radar } from 'react-chartjs-2';

const Details = () => {
    const {state, dispatch} = useContext(Store)

    const type = state.graphType;
    const metrics = state.metrics;

    const [data, setData] = useState([]);

    const options = {
      title: {
        display: true,
        text: 'Progress Radar'
      },
      elements: {
        line: {
          tension: 1.0,
        }
      },
      scale: {
        beginAtZero: true,
      }
    }

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

      const rData = Object.keys(metrics[0]).map(m => {
        console.log(m)
        if(m === "id" || m === "date" || m === "user_id")
        return metrics[latest.index][m] - metrics[earliest.index][m]
      })

      console.log(rData);
      setData(rData)
    }

    const radarData = {
      labels: ["Weight", "Hips", "Waist", "Arm Left", "Arm Right", "Leg Left", "Leg Right"],
      datasets: [{
        label: 'Progress',
        borderColor: 'rgba(253, 143, 37, 1)',
        backgroundColor: 'rgba(253, 143, 37, 0.4)',
        pointBackgroundColor: 'rgba(253, 143, 37, 1)',
        data: [10.62, 20.57, 37, 20.01, 10.5, 20.01, 10.5]
    }]}

    useEffect(() => {
      getData();
    }, [state.metrics])

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
                  <span>{metrics[earliest.index][type]}</span>
                </Row>
                <RadarContianer>
                  <Radar data={radarData} options={options}/>
                </RadarContianer>
            </DetailsContainer>
        );
    };

    return renderDetails();
}



export default Details;

const RadarContianer = styled.div`
  width: 100%;
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
