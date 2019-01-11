import React from "react";
import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';

const NavContainer = styled.div`
  height: 54px;
  width: 100vw;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.white};
  padding: 0px 30px;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
`;

const NavStyle = styled.div`
  width: 100%;
  max-width: ${props => props.isApp ? '1200 px' : props.theme.containingWidth};
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`

const StyledLink = styled(NavLink)`
  width: 100px;
  line-height: 51px;
  color: ${props => props.theme.white};
  text-decoration: none;
  text-align: center;
  font-size: ${props => props.landing ? '16px' : '26px'};
  font-family: ${props => props.theme.roboto};
  font-weight: 500;
  &.active {
    border-bottom: solid 2px ${props => props.theme.accent};
  }
  &:hover {
    /* border-bottom: solid 2px ${props => props.theme.accent}; */
    color: ${props => props.theme.accent};
  }
`

const Logo = styled(Link)`
  font-size: 25px;
  font-weight: 800;
  color: ${props => props.theme.accent};
  text-decoration: none;
  user-select: none;
`

const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;


const Navigation = (props) => {
  const renderRoutes = () => {

    if (props.location.pathname === "/" || props.location.pathname === "/login" || props.location.pathname === "/register") {
      return (
        <NavStyle>
        <Logo to="/">fitmetrix</Logo>
        <NavBar>
          <StyledLink to="/login" activeClassName='active' landing="true">Login</StyledLink>
          <StyledLink to="/register" activeClassName='active' landing="true">Register</StyledLink>
        </NavBar>
        </NavStyle>
      );
    }

    return (
      <NavStyle isApp="true">
        <Logo to="/">fitmetrix</Logo>
        <NavBar>
          <StyledLink to="/schedule" activeClassName='active'><i className="far fa-calendar-alt"></i></StyledLink>
          <StyledLink to="/workouts" activeClassName='active'><i className="fas fa-dumbbell"></i></StyledLink>
          <StyledLink to="/progress" activeClassName='active'><i className="fas fa-chart-line"></i></StyledLink>
          <StyledLink to="/settings" activeClassName='active'><i className="fas fa-cog"></i></StyledLink>
        </NavBar>
      </NavStyle>
    )

  }

  return (
    <NavContainer>
        {renderRoutes()}
    </NavContainer>
  );
};

export default Navigation;
