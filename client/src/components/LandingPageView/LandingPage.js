import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import deadliftImg from '../assets/deadlift-filter.jpg';
import squatImg from '../assets/squat-filter.jpg';

const LandingStyle = styled.div`
  width: 100%;
  max-width: ${props => props.theme.containingWidth};
  height: calc(100% - 54px);
  padding: 0px 30px;
  min-height: 700px;
  color: white;
  font-family: ${props => props.theme.roboto};
  position: relative;
  background-color: transparent;
  margin: 0 auto;
`;

const Action = styled.div`
  font-size: 2.8rem;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: left;
`

const BackgroundImage = styled.span`
  width: 100vw;
  height: 100%;
  min-height: 500px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: no-repeat center center fixed; 
  background-image: url(${squatImg});
  background-size: cover;
`

const CallToAction = styled.div`
  width: 400px;
  height: 200px;
  z-index: 2;
  position: absolute;
  top: 84px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const StyledButton = styled(Link)`
  width: 150px;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  border: none;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.theme.themeWhite};
  background-color: ${props => props.theme.primary};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const BlankImage = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 18px;
  position: absolute;
  top: 400px;
  right: 0px;
  background-color: white;
  color: ${props => props.theme.primaryDark};
`;

const DownArrow = styled.span`
  width: 60px;
  height: 80px;
  position: absolute;
  top: 500px;
  left: 0;
  font-size: 5.5rem;
  text-align: center;
`;

const Part2 = styled.div`
  width: 100vw;
  margin-left: -30px;
  height: 600px;
  background-color: white;
  font-size: 3.3rem;
`

const Part3 = styled.div`
  width: 100vw;
  margin-left: -30px;
  height: 600px;
  background-color: #F4F5F5;
  font-size: 3.3rem;
`

const Part4 = styled.div`
  width: 100vw;
  margin-left: -30px;
  height: 700px;
  background: no-repeat center center fixed; 
  background-image: url(${deadliftImg});
  background-size: cover;
  color: white;
  font-size: 3.3rem;
`

const LandingContainer = styled.div``;

const LandingPage = () => {
  const callToAction = 'Progress and Track your fitness journey with us';
  return (
    <LandingContainer>

      <LandingStyle>
        <BackgroundImage/>
        <CallToAction>
          <Action>{callToAction}</Action>
          <StyledButton to="/schedule">TRACK NOW</StyledButton>
        </CallToAction>
        <BlankImage>place holder</BlankImage>
        <DownArrow><i className="fas fa-arrow-down"></i></DownArrow>
      </LandingStyle>
      <Part2>placeholder</Part2>
      <Part3>placeholder</Part3>
      <Part4>placeholder</Part4>
    </LandingContainer>
  );
};

export default LandingPage;
