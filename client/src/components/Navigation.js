import React, { useState } from "react";
import { NavLink, Link, Route } from "react-router-dom";
import styled from "styled-components";

const Navigation = props => {
  const [account, setAccount] = useState(false);

  const logOut = () => {
    setAccount(!account);
    window.localStorage.removeItem("login_token");

    props.history.push("/");
  };

  const renderRoutes = () => {
    if (
      props.location.pathname === "/" ||
      props.location.pathname === "/login" ||
      props.location.pathname === "/register"
    ) {
      return (
        <NavStyle>
          <Logo to="/">fitmetrix</Logo>
          <NavBar>
            <StyledLink to="/login" activeClassName="active" landing="true">
              Login
            </StyledLink>
            <StyledLink to="/register" activeClassName="active" landing="true">
              Register
            </StyledLink>
          </NavBar>
        </NavStyle>
      );
    }

    return (
      <NavStyle isApp="true">
        <Logo to="/">fitmetrix</Logo>
        <NavBar>
          <StyledLink to="/schedule" activeClassName="active">
            <i className="far fa-calendar-alt" />
            <span>Schedule</span>
          </StyledLink>
          <StyledLink to="/workouts" activeClassName="active">
            <i className="fas fa-dumbbell" />
            <span>Workouts</span>
          </StyledLink>
          <StyledLink to="/progress" activeClassName="active">
            <i className="fas fa-chart-line" />
            <span>Progress</span>
          </StyledLink>
          <StyledLink to="/settings" activeClassName="active">
            <i className="fas fa-user"  />
            <span>Account</span>
          </StyledLink>
          <StyledLink to="/login" onClick={() => logOut()} activeClassName="active">
            <i className="fas fa-sign-out-alt" />
            <span>Logout</span>
          </StyledLink>
        </NavBar>
      </NavStyle>
    );
  };

  return <NavContainer>{renderRoutes()}</NavContainer>;
};

export default Navigation;

const NavContainer = styled.div`
  height: 72px;
  width: 100%;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.white};
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  padding: 0 2%;
`;

const NavStyle = styled.div`
  width: 100%;
  max-width: ${props =>
    props.isApp ? "1200 px" : props.theme.containingWidth};
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const StyledLink = styled(NavLink)`
  width: 100px;
  height: 72px;
  color: ${props => props.theme.white};
  text-decoration: none;
  text-align: center;
  font-size: ${props => (props.landing ? "16px" : "26px")};
  font-family: ${props => props.theme.roboto};
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  i {
    font-size: 22px;
  }
  span {
    font-size: 16px;
    font-weight: 500;
  }
  &.active {
    border-bottom: solid 2px ${props => props.theme.accent};
  }
  &:hover {
    /* border-bottom: solid 2px ${props => props.theme.accent}; */
    color: ${props => props.theme.accent};
  }
`;

const Logo = styled(Link)`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme.accent};
  text-decoration: none;
  user-select: none;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 42%;
`;
