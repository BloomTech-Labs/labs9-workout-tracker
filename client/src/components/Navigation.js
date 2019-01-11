import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';

const NavContainer = styled.div`
  height: 54px;
  width: 100vw;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.white};
  padding: 0px 30px;
  margin-bottom: 10px;
`;

const NavStyle = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLink = styled(NavLink)`
  width: 100px;
  line-height: 51px;
  color: ${props => props.theme.white};
  text-decoration: none;
  text-align: center;
  font-size: 26px;
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

const Navigation = () => {
  return (
    <NavContainer>
        <NavStyle>
          <Logo to="/">fitmetrix</Logo>
          <NavBar>
            <StyledLink to="/schedule" activeClassName='active'><i class="far fa-calendar-alt"></i></StyledLink>
            <StyledLink to="/workouts" activeClassName='active'><i class="fas fa-dumbbell"></i></StyledLink>
            <StyledLink to="/progress" activeClassName='active'><i class="fas fa-chart-line"></i></StyledLink>
            <StyledLink to="/settings" activeClassName='active'><i class="fas fa-cog"></i></StyledLink>
          </NavBar>
      </NavStyle>
    </NavContainer>
  );
};

export default Navigation;
