import React from "react";
import Carousel from "./Carousel";
import styled from "styled-components";
// import "./LandingPage.css";

const LandingStyle = styled.div`
  width: 100%;
  background-color: red;
`;

const LandingPage = () => {
  return (
    <LandingStyle>
      <Carousel />
    </LandingStyle>
  );
};

export default LandingPage;
