import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  width: 20%;
  margin-left: 2%;
`;

const SideNav = () => {
  return (
    <NavStyle>
      <Link to="/">Home</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/workouts">Workouts</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/billing">Billing</Link>
      <Link to="/settings">Settings</Link>
    </NavStyle>
  );
};

export default SideNav;
