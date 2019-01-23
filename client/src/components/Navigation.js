import React, { useState } from "react";
import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';


const Navigation = (props) => {

  const [account, setAccount] = useState(false);


  const logOut = () => {
    setAccount(!account);
    window.localStorage.removeItem('login_token');

    props.history.push('/');
  }

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
          <StyledUserIcon onClick={() => setAccount(!account)}>
            <i class="fas fa-user"></i>
          </StyledUserIcon>

          <AccountOptions show={account}>
            <OptionRowLink to="/settings" onClick={() => setAccount(!account)}>
              <span>Settings</span>
              <i className="fas fa-cog"></i>
            </OptionRowLink>
            <OptionRow onClick={() => logOut()}>
              <span>Logout</span>
              <i className="fas fa-sign-out-alt"></i>
            </OptionRow>
          </AccountOptions>
          {/* <StyledLink to="/settings" activeClassName='active'>Settings</StyledLink> */}
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

const OptionRow = styled.span`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: ${props => props.theme.primaryDark};
    padding: 0px 15px;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    .fas {
      font-size: 18px;
    }
`;

const OptionRowLink = styled(NavLink)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: ${props => props.theme.primaryDark};
    padding: 0px 15px;
    font-size: 16px;
    user-select: none;
    text-decoration: none;
    cursor: pointer;
    .fas {
      font-size: 18px;
    }
`;

const AccountOptions = styled.span`
  display: ${props => props.show ? 'flex' : 'none'};
  width: 130px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  position: absolute;
  background-color: white;
  right: 10px;
  bottom: -90px;
  width: 130px;
  border-radius: 8px;
  z-index: 6;
  border: 1px solid rgb(218, 220, 224);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
`;

const StyledUserIcon = styled.span`
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
`;


const NavContainer = styled.div`
  height: 54px;
  width: 100%;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.white};
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  margin:0 auto;
  padding: 0 2%;
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