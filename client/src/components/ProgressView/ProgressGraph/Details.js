import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Store } from "../../../index";
import { Radar } from "react-chartjs-2";

const Details = () => {
  const { state, dispatch } = useContext(Store);

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
      if (i > 1 || i < 8) {
        const value =
          metrics[latest.index][keys[i]] - metrics[earliest.index][keys[i]];

        radarData.push(value > 0 ? Math.round(value * 100) / 100 : 0);
      }
    }

    return radarData;
  };

  const radarData = {
    labels: [
      "Weight",
      "Hips",
      "Waist",
      "Arm Left",
      "Arm Right",
      "Leg Left",
      "Leg Right"
    ],
    datasets: [
      {
        label: "Progress",
        borderColor: "rgba(43, 58, 66, 1)",
        backgroundColor: "rgba(43, 58, 66, 0.4)",
        pointBackgroundColor: "rgba(43, 58, 66, 1)",
        data: getData()
      }
    ]
  };

  const renderDetails = () => {
    if (!metrics) return <span />;
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

    if (state.graphType === "legs") {
      const leftPro =
        metrics[latest.index]["leg_left"] - metrics[earliest.index]["leg_left"];
      const rightPro =
        metrics[latest.index]["leg_right"] -
        metrics[earliest.index]["leg_right"];
      return (
        <DetailsContainer>
          <h2>{state.graphType}</h2>
          <Row>
            <h3>Left Progress:</h3>
            <span>{Math.round(leftPro * 100) / 100}in</span>
          </Row>
          <Row>
            <h3>Left Current: </h3>
            <span>{metrics[latest.index]["leg_left"]}in</span>
          </Row>
          <Row right>
            <h3>Right Progress:</h3>
            <span>{Math.round(rightPro * 100) / 100}in</span>
          </Row>
          <Row right>
            <h3>Right Current: </h3>
            <span>{metrics[latest.index]["leg_right"]}in</span>
          </Row>
          <RadarContianer>
            <Radar data={radarData} />
          </RadarContianer>
        </DetailsContainer>
      );
    }

    if (state.graphType === "arms") {
      const leftPro =
        metrics[latest.index]["arm_left"] - metrics[earliest.index]["arm_left"];
      const rightPro =
        metrics[latest.index]["arm_right"] -
        metrics[earliest.index]["arm_right"];
      return (
        <DetailsContainer>
          <h2>{state.graphType}</h2>
          <Row>
            <h3>Left Progress:</h3>
            <span>{Math.round(leftPro * 100) / 100}in</span>
          </Row>
          <Row>
            <h3>Left Current: </h3>
            <span>{metrics[latest.index]["arm_left"]}in</span>
          </Row>
          <Row right>
            <h3>Right Progress:</h3>
            <span>{Math.round(rightPro * 100) / 100}in</span>
          </Row>
          <Row right>
            <h3>Right Current: </h3>
            <span>{metrics[latest.index]["arm_right"]}in</span>
          </Row>
          <RadarContianer>
            <Radar data={radarData} />
          </RadarContianer>
        </DetailsContainer>
      );
    }

    const progress =
      metrics[latest.index][type] - metrics[earliest.index][type];

    return (
      <DetailsContainer>
        <h2>{state.graphType}</h2>
        <Row>
          <h3>Progress:</h3>
          <span>
            {Math.round(progress * 100) / 100}
            {state.graphType === "weight" ? "lbs" : "in"}
          </span>
        </Row>
        <Row>
          <h3>Current: </h3>
          <span>
            {metrics[latest.index][type]}
            {state.graphType === "weight" ? "lbs" : "in"}
          </span>
        </Row>
        <RadarContianer>
          <Radar data={radarData} />
        </RadarContianer>
      </DetailsContainer>
    );
  };

  return renderDetails();
};

export default Details;

const RadarContianer = styled.div`
  width: 375px;
  margin-left: -80px;
  @media (max-width: 1040px) {
    position: absolute;
    right: -90px;
    top: 240px;
    top: 10px;
  }
  @media (max-width: 475px) {
    position: relative;
    display: flex;
    width: 120%;
    right: 0;
    top: 0;
    margin-left: -30px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  h3 {
    font-size: 1.5rem;
    font-family: 600;
    margin: 0;
  }
  span {
    font-size: 1.8rem;
    font-weight: 600;
    margin-left: 20px;
    color: ${props => props.theme.accent};
    ${props =>
      props.right &&
      css`
        color: ${props => props.theme.primaryLight};
      `}
  }
  @media (max-width: 1040px) {
    width: 50%;
  }
  @media (max-width: 500px) {
    width: 180px;
  }
  @media (max-width: 475px) {
    width: 100%;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  position: relative;
  overflow: hidden;
  h2 {
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    color: ${props => props.theme.primaryDark};
  }
  @media (max-width: 1040px) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 200px;
  }
  @media (max-width: 475px) {
    height: 400px;
  }
`;
