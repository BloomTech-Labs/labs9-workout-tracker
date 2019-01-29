import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import * as firebase from "firebase";
import requireAuth from "../../requireAuth";

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
        <Div>
          <LabelStyle>Old Password:</LabelStyle>

          <InputStyle
            type="password"
            value={currentPassword}
            placeholder="Current Password"
            autoCapitalize="none"
            onChange={e => setcurrentPassword(e.target.value)}
          />
        </Div>
        <Div>
          <LabelStyle>New Password:</LabelStyle>

          <InputStyle
            type="password"
            value={newPassword}
            placeholder="New Password"
            autoCapitalize="none"
            onChange={e => setPassword(e.target.value)}
          />
        </Div>
        <Div>
          <LabelStyle>Confirm Password:</LabelStyle>

          <InputStyle
            type="password"
            value={confirmNewPassword}
            placeholder="Confirm Password"
            autoCapitalize="none"
            onChange={e => setConfirmNewPassword(e.target.value)}
          />
        </Div>
        <Button title="Change Password">Update Info</Button>
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
  border: 1px solid ${props => props.theme.primaryDark};
  border-top: 0px;
  border-radius: 0 6px 6px 6px;
  background-color: ${props => props.theme.primary};
  margin: 0 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
`;
const LabelStyle = styled.label`
  display: flex;
  align-self: flex-start;
  color: ${props => props.theme.themeWhite};
`;

const InputStyle = styled.input`
  height: 40px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 161.438px;
`;

const Button = styled.button`
  border-radius: 5px;
  height: 40px;
  color: white;
  font-size:1.4rem;
  background: ${props => props.theme.primaryDark};
  font-weight: bold;
  width: 40%;
  min-width: 161.438px;
  padding 5px 50 px;
`;
