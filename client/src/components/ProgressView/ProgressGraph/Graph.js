import React, { useEffect, useState, useContext } from "react";
import { Store } from '../../../index';
import styled from "styled-components";
import {Line} from 'react-chartjs-2';

const Graph = () => {
    const { state, dispatch } = useContext(Store);
    const type = state.graphType;
    
    const dateParser = date => {
        date = date.split("/")

        return date[1] + "/" + date[2];
    };

    const [ labels, setLabels ] = useState([])

    const getLineData = () => {
        if (!state.metrics) return{};
        if (type === "arms" || type === "legs") {
            if(type === "arms") {
                const leftArm = state.metrics.map(m => m.arm_left);
                const rightArm = state.metrics.map(m => m.arm_right);

                return {
                    labels,
                    datasets: [
                      {
                        label: 'Left Arm',
                        fill: "start",
                        lineTension: 0.4,
                        backgroundColor: 'rgba(253, 143, 37, 0.4)',
                        borderColor: 'rgba(253, 143, 37, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(253, 143, 37, 1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(253, 143, 37, 1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: leftArm,
                      },
                      {
                        label: 'Right Arm',
                        fill: "start",
                        lineTension: 0.4,
                        backgroundColor: 'rgba(190, 211, 221, 0.4)',
                        borderColor: 'rgba(190, 211, 221, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(190, 211, 221, 1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(190, 211, 221, 1)',
                        pointHoverBorderColor: 'rgba(190, 211, 221, 1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: rightArm
                      }
                    ],
                };
            }
            if(type === "legs") {
                const leftLeg = state.metrics.map(m => m.leg_left);
                const rightLeg = state.metrics.map(m => m.leg_right);

                return {
                    labels,
                    datasets: [
                      {
                        label: 'Left Leg',
                        fill: "start",
                        lineTension: 0.4,
                        backgroundColor: 'rgba(253, 143, 37, 0.4)',
                        borderColor: 'rgba(253, 143, 37, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(253, 143, 37, 1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(253, 143, 37, 1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: leftLeg,
                      },
                      {
                        label: 'Right Leg',
                        fill: "start",
                        lineTension: 0.4,
                        backgroundColor: 'rgba(190, 211, 221, 0.4)',
                        borderColor: 'rgba(190, 211, 221, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(190, 211, 221, 1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(190, 211, 221, 1)',
                        pointHoverBorderColor: 'rgba(190, 211, 221, 1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: rightLeg
                      }
                    ],
                };
            }
        }

        const firstUpper = (word) => {
            const split = word.toLowerCase().split(''); 
            split[0] = split[0].toUpperCase(); 
            return split.join('')
        }

        const nData = state.metrics.map(m => m[type]);
        return {
            labels,
            datasets: [
              {
                label: firstUpper(type),
                fill: "start",
                lineTension: 0.4,
                backgroundColor: 'rgba(253, 143, 37, 0.4)',
                borderColor: 'rgba(253, 143, 37, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(253, 143, 37, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(253, 143, 37, 1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: nData,
              }
            ],
        };

    }

    const options = {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Day'
                }
            }],
            yAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: 'lbs'
                }
            }]
        }
    }


    useEffect(() => {
        if (!state.metrics) return;

        const nDates = state.metrics.map(m => dateParser(m.date));
        setLabels(nDates);


    }, [state.metrics, state.graphType]);


    return (
        <StyledGraph>
            <Line data={getLineData()} options={options}/>
        </StyledGraph>
    );
}

export default Graph;

const StyledGraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  background-color: white;
  margin-top: 30px;
  @media (max-width: 1040px) {
      width: 100%;
  }
`;