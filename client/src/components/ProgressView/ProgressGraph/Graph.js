import React, { useEffect, useState, useContext } from "react";
import { Store } from '../../../index';
import styled from "styled-components";
import {Line} from 'react-chartjs-2';

const Graph = () => {
    const { state, dispatch } = useContext(Store);
    const type = state.graphType;
    
    const dateParser = date => {

        console.log(date);
        date = date.split("/")

        return date[1] + "/" + date[2];
    };

    const [ data, setData ] = useState([])
    const [ data2, setData2 ] = useState([])
    const [ labels, setLabels ] = useState([])

    const [lineData, setLineData] = useState({
        labels,
        datasets: [
          {
            label: 'Weight',
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
            data,
          }
        ],
    })

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

        if (type === "arms" || type === "legs") {
            if(type === "arms") {
                const leftArm = state.metrics.map(m => m.arm_left);
                setData(leftArm)
                const rightArm = state.metrics.map(m => m.arm_right);
                setData2(rightArm)

                setLineData({
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
                        data: data,
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
                        data: data2
                      }
                    ],
                });
                return;
            }
            if(type === "legs") {
                const leftLeg = state.metrics.map(m => m.leg_left);
                setData(leftLeg)
                const rightLeg = state.metrics.map(m => m.leg_right);
                setData2(rightLeg)

                setLineData({
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
                        data: data,
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
                        data: data2
                      }
                    ],
                });
                return;
            }
        }

        const nData = state.metrics.map(m => m[type]);
        setData(nData)

        setLineData({
            labels,
            datasets: [
              {
                label: 'Weight',
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
                data,
              }
            ],
        })


    }, [state.metrics, state.graphType]);


    return (
        <StyledGraph>
            <Line data={lineData} options={options}/>
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
`;