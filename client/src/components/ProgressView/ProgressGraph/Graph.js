import React, { useEffect, useState, useContext } from "react";
import { Store } from '../../../index';
import styled from "styled-components";
import {Line} from 'react-chartjs-2';
import Button from '../../../shared/Button';
import { Link } from 'react-router-dom';

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

        const sortedMetrics = state.metrics;
        sortedMetrics.sort((a, b) => {
            const newA = Number(dateParser(a.date).split('/').join(''))
            const newB = Number(dateParser(b.date).split('/').join(''))
            return newA - newB;
        });

        if (type === "arms" || type === "legs") {
            if(type === "arms") {
                const leftArm = sortedMetrics.map(m => m.arm_left);
                const rightArm = sortedMetrics.map(m => m.arm_right);

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
                const leftLeg = sortedMetrics.map(m => m.leg_left);
                const rightLeg = sortedMetrics.map(m => m.leg_right);

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

        let nData = sortedMetrics.map(m => m[type]);


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
                stacked: state.graphType === "legs" || state.graphType === "arms" ? true : false,
                scaleLabel: {
                    display: true,
                    labelString: state.graphType === "weight" ? 'lbs' : 'in',
                }
            }]
        }
    }


    useEffect(() => {
        if (!state.metrics) return;

        const nDates = state.metrics.map(m => dateParser(m.date));
        nDates.sort((a, b) => {
            const newA = Number(a.split('/').join(''))
            const newB = Number(b.split('/').join(''))
            return newA - newB;
        });
        setLabels(nDates);


    }, [state.metrics, state.graphType]);


    return (
        <StyledGraph>
            {
                !state.premium &&  state.graphType !== "weight"
                ? (<StyledFeatureBlock>
                    Pro feature
                    <StyledLink to="/settings">
                        <Button type="button" scheme="cancel"> Upgrade Now</Button>
                    </StyledLink>
                    </StyledFeatureBlock>)
                : <Line data={getLineData()} options={options}/>
            }
        </StyledGraph>
    );
}

export default Graph;

const StyledLink = styled(Link)`
    margin-top: 20px;
`;

const StyledFeatureBlock = styled.div`
    width: 95%;
    height: 100%;
    background-color: #EBEBE4;
    color: #B1B1AD;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 5.5rem;
    font-weight: 600;
    height: 400px;
    border-radius: 12px;
    padding: 0px 100px;

    @media (max-width: 1040px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      padding: 0px 20px;
      font-size: 4.0rem;
    }
`;

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