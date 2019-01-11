import React from "react";
import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import styled from "styled-components";
import ropeImg from '../assets/rope.jpg';
import barbellImg from '../assets/barbell.jpeg';
import deadliftImg from '../assets/deadlift.jpeg';
// import "./LandingPage.css";

const LandingStyle = styled.div`
  width: 100vw;
  height: 100%;
  color: white;
  font-family: ${props => props.theme.roboto};
  position: fixed;
  left: 0;
  position: relative;
  top: 0;
  background-color: transparent;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  width: 60px;
  padding: 0px 20px;
`

const LandingNavigation = styled.div`
position: absolute;
top: 0;
right: 0;
height: 54px;
width: 180px;
`;

const Welcome = styled.div`
  font-size: 6rem;
  font-weight: bold;`

const Action = styled.div`
  font-size: 2.4rem;
`

const BrandName = styled.span`
  color: ${props => props.theme.accent};
`
const Blur = styled.span`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  background-image: url(${barbellImg});
  background-size: cover;
  filter: blur(4px);
`

const CallToAction = styled.div`
  width: 400px;
  height: 400px;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
`

const LandingPage = () => {
  return (
    <LandingStyle>
      <Blur/>
      <LandingNavigation>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/register">Register</StyledLink>
      </LandingNavigation>
      <CallToAction>
        <Welcome>Welcome to <BrandName>fitmetrix</BrandName>!</Welcome>
        <Action>Schedule and track workouts, track your fitness progress, get results.</Action>
      </CallToAction>

    </LandingStyle>
  );
};

export default LandingPage;
