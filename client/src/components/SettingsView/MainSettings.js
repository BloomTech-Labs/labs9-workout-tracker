import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import * as firebase from "firebase";
import requireAuth from "../../requireAuth";
import PasswordView from "./Password";
import BillingView from "./BillingView";
import SettingsView from "./SettingsView";

const MainSettingsView = props => {
  const [passwordFlag, setpasswordFlag] = useState(false);
  const [accountFlag, setaccountFlag] = useState(true);
  

  const renderTab = () => {
    if (passwordFlag === true && accountFlag === false) {
     return (
     <SubNav>
     <HeaderTab>
     <HeaderBlank
     onClick={() => {
         accountClick();
        }}
        >
        Account
        </HeaderBlank>
        <HeaderBlue
        onClick={() => {
            passwordClick();
        }}
        >
        Password
        </HeaderBlue>
        </HeaderTab>
        </SubNav>
     ) 
    } else if (passwordFlag === false && accountFlag === true) {
        return (
                <SubNav>
                <HeaderTab>
                <HeaderBlue
                onClick={() => {
                    accountClick();
                }}
                >
                Account
                </HeaderBlue>
                <HeaderBlank
                onClick={() => {
                    passwordClick();
                }}
                >
                Password
                </HeaderBlank>
                </HeaderTab>
                </SubNav>
            )  
    }
  };

  const passwordClick = () => {
    setpasswordFlag(true);
    setaccountFlag(false);
  };

  const accountClick = () => {
    setpasswordFlag(false);
    setaccountFlag(true);
  };

  const renderView = () => {
    if (passwordFlag === true && accountFlag === false) {
      return <PasswordView {...props} />;
    }
    if (passwordFlag === false && accountFlag === true) {
      return <SettingsView {...props} />;
    }
  };

return (
    <MainSettingsDiv>
      {renderTab()}
      {renderView()}
    </MainSettingsDiv>
  );
};

export default MainSettingsView;

const MainSettingsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubNav = styled.div`
  display: flex;
  width: 100%;
  max-width: 880px;
  justify-content:center;
  height: 30px;
`;

const HeaderTab = styled.div`
display:flex;
width:70%;
height: 30px;
`;

const HeaderBlue = styled.h1`
  margin: 0;
  width: 25%;
  background-color: ${props => props.theme.primary};
  border-radius: 10px 10px 0 0;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:1.5rem;
  color:${props => props.theme.themeWhite};
  height:40px;
  :hover {
    cursor: pointer;
}

  @media(max-width:420px) {
    font-size:1.1rem;
  }
`;

const HeaderBlank = styled.h1`
  margin: 0;
  width: 25%;
  background-color: ${props => props.theme.accent};
  border-radius: 10px 10px 0 0;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:1.5rem;
  color:${props => props.theme.themeWhite};
  height:40px;
  :hover {
      cursor: pointer;
  }

  @media(max-width:420px) {
    font-size:1.1rem;
  }
  `;
