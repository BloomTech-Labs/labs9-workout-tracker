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
    const [premiumFlag, setpremiumFlag] = useState(false)
    const [accountFlag, setaccountFlag] = useState(true);
    

    const passwordClick = () => {
        setpasswordFlag(true);
        setaccountFlag(false);
        setpremiumFlag(false);
    }
    const premiumClick = () => {
        setpasswordFlag(false);
        setpremiumFlag(true);
        setaccountFlag(false);
    }
    const accountClick = () => {
        setpasswordFlag(false);
        setpremiumFlag(false);
        setaccountFlag(true);
    }


    const renderView = () => {
         if (passwordFlag === true && premiumFlag === false) {
            return (
                <PasswordView {...props} />
            )
        } if (premiumFlag === true && passwordFlag === false) {
            return (
                <BillingView {...props} /> 
            )
        } 
    }

return (
    <div> 
        <div>      
            <h1 onClick = {(e) => {accountClick()}}>Account</h1>
            <h1 onClick = {(e) => {premiumClick()}}>Premium</h1>
            <h1 onClick = {() => {passwordClick()}}>Password</h1>
        </div>
        {renderView()}
    </div>
)

}

export default MainSettingsView;