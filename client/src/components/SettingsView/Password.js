import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import * as firebase from 'firebase';
import requireAuth from '../../requireAuth';


const PasswordView = props => {
    const [currentPassword, setcurrentPassword] = useState('')
    const [newPassword, setPassword] = useState('');
    const [email, setEmail] = useState(props.user.email);

    const reauthenticate = (currentPassword) => {
        console.log("currentpassword auth:",currentPassword)
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(props.user.email, currentPassword);
        return user.reauthenticateWithCredential(cred)
    }

    const changePassword = (e) => {
        e.preventDefault();
        console.log("changePassword ")
        
        reauthenticate(currentPassword).then(() => {
            console.log("currentpassword auth2:",currentPassword)

            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                alert('Password was changed');
            }).catch((error) => {
                alert(error.message);
            })
        }).catch((error) => {
            alert(error.message);
        })
        setPassword('')
        setcurrentPassword('')
    }


return (
    <div>
        <FormStyle onSubmit={(e) => changePassword(e)}>
            <input 
                type='password'
                value={currentPassword}
                placeholder='Current Password'
                autoCapitalize='none'
                onChange={(e) => setcurrentPassword(e.target.value)}
            />
            <input
                type='password'
                value={newPassword}
                placeholder='New Password'
                autoCapitalize='none'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button title='Change Password'>Update Info</button>
        </FormStyle>
    </div>
    )
}


export default requireAuth(PasswordView)

const FormStyle = styled.form`
border: 1px solid ${props => props.theme.primaryDark};
border-radius: 6px;
background-color: ${props => props.theme.primary};
margin: 0 2%;
display:flex;
flex-direction:column;
padding: 20px 7%;
align-items:center;
@media(max-width:634px) {
  display:flex;
  flex-direction:column;
  align-items:center;
  width:60%;
}
`;