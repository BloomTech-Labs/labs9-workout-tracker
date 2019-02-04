import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import * as firebase from "firebase";
import requireAuth from "../../requireAuth";
import FormInput from '../../shared/FormInput'
import Button from '../../shared/Button'

const PasswordView = props => {
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [email, setEmail] = useState(props.user.email);

  const reauthenticate = currentPassword => {
    console.log("currentpassword auth:", currentPassword);
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      props.user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = e => {
    e.preventDefault();
    console.log("changePassword ");
    if (newPassword === confirmNewPassword) {
      reauthenticate(currentPassword)
        .then(() => {
          console.log("currentpassword auth2:", currentPassword);

          var user = firebase.auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              alert("Password was changed");
            })
            .catch(error => {
              alert(error.message);
            });
        })
        .catch(error => {
          alert(error.message);
        });
      setPassword("");
      setcurrentPassword("");
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <SettingsViewStyle>
      <FormStyle onSubmit={e => changePassword(e)}>
          <FormInput 
            label={"old password"}
            type="password"
            value={currentPassword}
            placeholder="Current Password"
            onChange={e => setcurrentPassword(e.target.value)}
            lableColor="white"
          />
          <FormInput 
            label={"new password"}
            type="password"
            value={newPassword}
            placeholder="New Password"
            onChange={e => setPassword(e.target.value)}
            lableColor="white"
          />
          <FormInput 
            label={"confirm password"}
            type="password"
            value={confirmNewPassword}
            placeholder="Confirm Password"
            onChange={e => setConfirmNewPassword(e.target.value)}
            lableColor="white"
          />
        <Button type="button" onClick={e => changePassword(e)}>Update Info</Button>
      </FormStyle>
    </SettingsViewStyle>
  );
};

export default requireAuth(PasswordView);

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.6rem;
  height: 651px;
  padding-bottom: 100px;
`;

const FormStyle = styled.form`
  border-top: 0px;
  border-left: 1px solid #2B3A42;
  border-right: 1px solid #2B3A42;
  border-bottom: 1px solid #2B3A42;
  border-radius: 0 0 6px 6px;
  margin: 0 2%;
  display: flex;
  flex-direction: column;
  padding: 20px 7%;
  align-items: center;
  max-width: 616px;
  width: 70%;
  height: 100%;
  @media (max-width: 634px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

