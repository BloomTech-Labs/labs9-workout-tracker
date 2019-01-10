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
  background-image: url(${barbellImg});
  background-size: cover;
  color: white;
  font-family: 'Anton', sans-serif;
  position: fixed;
  left: 0;
  top: 0;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: white    
`

const LandingPage = () => {
  return (
    <LandingStyle>
      <div>
        <StyledLink to="/sign-in">Sign In</StyledLink>
        <StyledLink to="/sign-up">Sign Up</StyledLink>
      </div>
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-in" component={SignIn} />
    </LandingStyle>
  );
};

export default LandingPage;
