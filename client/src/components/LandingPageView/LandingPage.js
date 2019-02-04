import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../shared/Button';
import deadliftImg from '../assets/deadlift-filter.jpg';
import squatImg from '../assets/squat-filter.jpg';
import fitnesstrackerImg from '../assets/fitness-tracker.svg';
import CalendarView from '../assets/CalendarView.png';
import ProgressView from '../assets/ProgressView.png';
import WorkoutsView from '../assets/WorkoutsView.png';

const LandingPage = () => {
  const preCallToAction = 'Progress starts with a plan.';
  const callToAction = 'Track your fitness journey with us.';

  return (
    <LandingContainer>
      <LandingStyle>
        <BackgroundImage />
        <CtaDiv>
          <CallToAction>
            <Action>{preCallToAction}</Action>
            <Action>{callToAction}</Action>
            <Link to="/register">
              <Button>START TRACKING NOW</Button>
            </Link>
          </CallToAction>
          {/* <BlankImage /> */}
        </CtaDiv>
      </LandingStyle>
      <Part2>
        <CalendarPic src={CalendarView} alt="A picture of the calendar view." />
        <CalendarDemo>Your workout, on your time.</CalendarDemo>
      </Part2>
      <Part3>
        <WorkoutDemo>Plan ahead, execute your plan.</WorkoutDemo>
        <WorkoutPic src={WorkoutsView} alt="A picture of the workouts view." />
      </Part3>
      <Part4>
        <ProgressPic src={ProgressView} alt="A picture of the progress view." />
        <ProgressDemo>Track your progress, meet your goals.</ProgressDemo>
      </Part4>
      <Part5>Copyright 2019 fitmetrix. All rights reserved.</Part5>
    </LandingContainer>
  );
};

export default LandingPage;

const LandingStyle = styled.div`
  width: 100%;
  max-width: ${props => props.theme.containingWidth};
  height: calc(100% - 54px);
  min-height: 900px;
  color: white;
  font-family: ${props => props.theme.roboto};
  position: relative;
  background-color: transparent;
  margin: 0 auto;
  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 600px;
  }
`;

const Action = styled.div`
  font-size: 2.8rem;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: left;
  color: white;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

const BackgroundImage = styled.span`
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: no-repeat center center fixed;
  background-image: url(${squatImg});
  background-size: cover;
`;

const CtaDiv = styled.div`
  display:flex @media(max-width:900px) {
    flex-direction: column;
    align-items: center;
  }
`;
const CallToAction = styled.div`
  height: 200px;
  z-index: 2;
  position: absolute;
  top: 250px;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  
  @media(max-width:900px){
    top:200px;
    margin: 0 auto;
    display:flex;
    align-items:center
    width:100%;
  }
`;

// const BlankImage = styled.div`
//   width: 400px;
//   height: 400px;
//   border-radius: 18px;
//   position: absolute;
//   margin-right: 2%;
//   top: 360px;
//   right: 0px;
//   background-color: ${props => props.theme.primaryDark};
//   background-image: url(${fitnesstrackerImg});
//   background-size: 400px 400px;
//   background-repeat: no-repeat;
//   box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.4);

//   @media (max-width: 900px) {
//     display: none;
//   }
// `;

const Part2 = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 450px;
  background-color: transparent;
  font-size: 3.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: cente @media (max-width: 900px) {
    flex-direction: column;
  }
  margin-bottom: 200px;
`;

const CalendarPic = styled.img`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  align-items: center;
  // border: 1px solid red;
  @media (max-width: 900px) {
    width: 65%;
  }
`;

const CalendarDemo = styled.div`
  font-family: ${props => props.theme.roboto};
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: center;
  align-items: flex-start;
  width: 40%;
  height: 350px
  align-items: center;
  color: white;
  // border: 1px solid red;
  @media (max-width: 900px) {
    width: 65%;
  }
`;

const Part3 = styled.div`
  width: 100%;
  height: 450px;
  background-color: transparent;
  font-size: 3.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparen @media (max-width: 900px) {
    flex-direction: column;
  }
  margin-bottom: 200px;
`;

const WorkoutPic = styled.img`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  align-items: center;
  // border: 1px solid red;
  @media (max-width: 900px) {
    width: 65%;
  }
`;

const WorkoutDemo = styled.div`
  font-family: ${props => props.theme.roboto};
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: center;
  align-items: flex-start;
  width: 40%;
  height: 350px;
  color: white;
  // border: 1px solid red;
  @media (max-width: 900px) {
    width: 65%;
  }
`;

const Part4 = styled.div`
  width: 100%;
  height: 450px;
  background-color: transparent;
  font-size: 3.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparen @media (max-width: 900px) {
    flex-direction: column;
  }
  margin-bottom: 100px;
`;

const ProgressDemo = styled.div`
  font-family: ${props => props.theme.roboto};
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: center;
  align-items: flex-start;
  width: 40%;
  height: 350px;
  color: white;
  // border: 1px solid red;
  @media (max-width: 900px) {
    width: 65%;
  }
`;

const ProgressPic = styled.img`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  align-items: center;
  // border: 1px solid red;
  @media (max-width: 900px) {
    width: 65%;
  }
`;

const Part5 = styled.div`
  width: 100%;
  background: no-repeat center center fixed;
  src: url(${deadliftImg});
  background-size: cover;
  color: white;
  font-size: 1.6rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LandingContainer = styled.div``;
