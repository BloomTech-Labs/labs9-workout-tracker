import React from "react";
import { Route } from 'react-router-dom'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Carousel from "./Carousel";
import styled from "styled-components";
// import "./LandingPage.css";

const LandingStyle = styled.div`
  width: 100%;
  background-color: #005073;
  color: white;
  font-family: 'Anton', sans-serif;
`;

const LandingPage = () => {
  return (
    <LandingStyle>
      <Carousel />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-in" component={SignIn} />
    </LandingStyle>
  );
};

export default LandingPage;
