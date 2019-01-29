import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import * as firebase from 'firebase';
import requireAuth from '../../requireAuth';
import PasswordView from './Password';
import BillingView from './BillingView';
import SettingsView from "./SettingsView";


const MainSettingsView = props => {
    const [passwordFlag, setpasswordFlag] = useState(false)
    const [accountFlag, setaccountFlag] = useState(true);
    

    const passwordClick = () => {
        setpasswordFlag(true);
        setaccountFlag(false);
    }

    const accountClick = () => {
        setpasswordFlag(false);
        setaccountFlag(true);
    }


    const renderView = () => {
         if (passwordFlag === true && accountFlag === false) {
            return (
                <PasswordView {...props} />
            )
        } if (passwordFlag === false && accountFlag === true) {
            return (
                <SettingsView {...props} />
            )
        }
    }

return (
    <MainSettingsDiv> 
        <div>      
            <h1 onClick = {(e) => {accountClick()}}>Account</h1>
            <h1 onClick = {() => {passwordClick()}}>Password</h1>
        </div>
        {renderView()}
    </MainSettingsDiv>
)

}

export default MainSettingsView;

const MainSettingsDiv = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
`;