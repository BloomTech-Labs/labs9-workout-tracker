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
      </SubNav>
     ) 
    } else if (passwordFlag === false && accountFlag === true) {
        return (
                <SubNav>
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
  max-width: 844px;
`;

const HeaderBlue = styled.h1`
  margin: 0;
  padding-right: 10px;
  background-color: blue;
`;

const HeaderBlank = styled.h1`
  margin: 0;
  padding-right: 10px;
  background-color: green;
`;
