import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import deadliftImg from '../assets/deadlift-filter.jpg';
import squatImg from '../assets/squat-filter.jpg';
import fitnesstrackerImg from '../assets/fitness-tracker.svg';

const LandingPage = () => {
  const preCallToAction = 'Progress starts with a plan.';
  const callToAction = 'Track your fitness journey with us.';
  return (
    <LandingContainer>
      <LandingStyle>
        <BackgroundImage />
        <CallToAction>
          <Action>{preCallToAction}</Action>
          <Action>{callToAction}</Action>
          <StyledButton to="/register">
            START TRACKING YOUR WORKOUTS NOW
          </StyledButton>
        </CallToAction>
        <BlankImage />
        {/* <DownArrow>
          <i className="fas fa-arrow-down" />
        </DownArrow> */}
      </LandingStyle>
      <Part2>
        <CalendarPic>Calendar pic goes here.</CalendarPic>
        <CalendarDemo>Your workout, on your time.</CalendarDemo>
      </Part2>
      <Part3>
        <WorkoutDemo>Plan ahead, execute your plan.</WorkoutDemo>
        <WorkoutPic>Workout pic goes heres.</WorkoutPic>
      </Part3>
      <Part4>
        <ProgressPic>Progress pic goes here.</ProgressPic>
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
  padding: 0px 30px;
  min-height: 1200px;
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
  color: white;
`;

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
`;

const CallToAction = styled.div`
  width: 400px;
  height: 200px;
  z-index: 2;
  position: absolute;
  top: 350px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledButton = styled(Link)`
  width: 350px;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  border: none;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  background-color: ${props => props.theme.primary};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const BlankImage = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 18px;
  position: absolute;
  top: 360px;
  right: 0px;
  background-color: ${props => props.theme.primaryDark};
  background-image: url(${fitnesstrackerImg});
  background-size: 400px 400px;
  background-repeat: no-repeat;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.4);
`;

// const DownArrow = styled.span`
//   width: 60px;
//   height: 80px;
//   position: absolute;
//   top: 500px;
//   left: 0;
//   font-size: 5.5rem;
//   text-align: center;
// `;

const Part2 = styled.div`
  width: 100vw;
  margin-left: -30px;
  height: 600px;
  background-color: white;
  font-size: 3.3rem;
  display: flex;
`;

const CalendarPic = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 200px;
  padding-top: 250px;
`;

const CalendarDemo = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 200px;
  padding-top: 250px;
`;

const Part3 = styled.div`
  width: 100vw;
  margin-left: -30px;
  height: 600px;
  background-color: #f4f5f5;
  font-size: 3.3rem;
  display: flex;
`;

const WorkoutPic = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 200px;
  padding-top: 250px;
`;

const WorkoutDemo = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 200px;
  padding-top: 250px;
`;

const Part4 = styled.div`
  width: 100vw;
  margin-left: -30px;
  height: 600px;
  background-color: white;
  font-size: 3.3rem;
  display: flex;
`;

const ProgressDemo = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 200px;
  padding-top: 250px;
`;

const ProgressPic = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: 200px;
  padding-top: 250px;
`;

const Part5 = styled.div`
  width: 100vw;
  margin-left: -30px;
  height: 700px;
  background: no-repeat center center fixed;
  background-image: url(${deadliftImg});
  background-size: cover;
  color: white;
  font-size: 3.3rem;
`;

const LandingContainer = styled.div``;
