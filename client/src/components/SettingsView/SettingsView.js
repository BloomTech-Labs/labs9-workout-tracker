import React, { useState } from "react";
import styled from "styled-components";
import StripeButton from "./BillingView.js";
import axios from "axios";
import * as firebase from "firebase";
import requireAuth from "../../requireAuth";
import MainSettings from "./MainSettings";
import "./settings.css";
//working on updating info

const SettingsView = props => {
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState(props.user.phone);
  const [recieves_email, setRecieveEmail] = useState(props.user.recieves_email);
  const [premium, displayPremium] = useState(props.user.premium);
  const [newPassword, setPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const updateUser = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");
    reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(email)
          .then(async () => {
            if (token !== undefined) {
              const res = await axios.put(
                "https://fitmetrix.herokuapp.com/api/user/edit",
                { email, phone, recieves_email },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                  }
                }
              );
              if (props.user.email !== email) {
                alert("Email has changed");
              }
              console.log(res.data);
              props.dispatch({ type: "USER_MODEL", payload: res.data });

              setcurrentPassword("");
            }
          })
          .catch(error => {
            alert("Reformat email to update email");
          });
      })
      .catch(error => {
        alert("not sure of this catch");
      });
  };

  

  const renderVerifyPassword = () => {
    if (
      email !== props.user.email ||
      phone !== props.user.phone ||
      recieves_email !== props.user.recieves_email
    ) {
      return (
        <ChangePasswordDiv>
          <LabelStyle for="error">Verify Password:</LabelStyle>
          <InputStyle
            id="error"
            type="password"
            value={currentPassword}
            placeholder="Enter password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChange={e => setcurrentPassword(e.target.value)}
            required
          />
          <Button title="Change Password">Update Info</Button>
        </ChangePasswordDiv>
      );
    } else {
      return (
        <ChangePasswordDivInvis>
          <LabelStyle for="error">Verify Password:</LabelStyle>
          <InputStyle
            id="error"
            type="password"
            value={currentPassword}
            placeholder="Enter password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChange={e => setcurrentPassword(e.target.value)}
            required
          />
          <Button title="Change Password">Update Info</Button>
        </ChangePasswordDivInvis>
      );
    }
  };

  const renderPremium = () => {
    if (props.user.premium === true) {
      return (
        <PremiumDiv>
          <div>
            <PremiumStyle>Account Status:</PremiumStyle>
            <p>Premium</p>
          </div>
        </PremiumDiv>
      );
    } else {
      return (
        <PremiumDiv>
          <div className="status-div">
            <LabelStyle>Account Status:</LabelStyle>
            <p>Basic</p>
          </div>
          <StripeStyle>
            <StripeButton />
          </StripeStyle>
        </PremiumDiv>
      );
    }
  };

  const reauthenticate = currentPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      props.user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  return (
    <ContainerDiv>
      <SettingsViewStyle>
        <FormStyle onSubmit={e => updateUser(e)}>
          <Div>
            <LabelStyle>Email:</LabelStyle>
            <InputStyle
              type="email"
              placholder="hello"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Div>
          <Div>
            <LabelStyle>Phone:</LabelStyle>
            <InputStyle
              type="tel"
              placeholder={phone}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </Div>
          <RecEmailDiv>
            <LabelStyle>Recieve Email?</LabelStyle>
            <label className="switch">
              <input
                type="checkbox"
                name="Recieve Email"
                checked={recieves_email}
                onChange={e => setRecieveEmail(e.target.checked)}
              />
              <span className="slider round" />
            </label>
          </RecEmailDiv>
          <ButtonDiv>{renderPremium()}</ButtonDiv>
          {renderVerifyPassword()}
        </FormStyle>
      </SettingsViewStyle>
    </ContainerDiv>
  );
};

export default requireAuth(SettingsView);

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.6rem;
  align-items: center;
  height: 651px;
  padding-bottom: 100px;
`;

const FormStyle = styled.form`
  border: 1px solid ${props => props.theme.primaryDark};
  border-radius: 0 6px 6px 6px;
  background-color: ${props => props.theme.primary};
  margin: 0 2%;
  display: flex;
  width: 70%;
  flex-direction: column;
  padding: 20px 7%;
  align-items: center;
  border-top: 0px;
  height: 651px;
`;

const InputStyle = styled.input`
  height: 40px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 161.438px;
  :invalid {
    border: 2px solid gray;
    background-color: pink;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  height: 40px;
  color: white;
  font-size:1.4rem;
  background: ${props => props.theme.primaryDark};
  font-weight: bold;
  width: 180px;
  padding 5px 50 px;
  margin-top:10px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  margin-top: 25px;
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const ChangePasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 550px) {
    width: 100%;
  }
`;

const ChangePasswordDivInvis = styled.div`
  display: flex;
  visibility: hidden;
  flex-direction: column;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const RecEmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin-top: 25px;
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
`;

const LabelStyle = styled.label`
  display: flex;
  align-self: flex-start;
  color: ${props => props.theme.themeWhite};
`;

const PremiumDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  @media (max-width: 550px) {
    width: 100%;
  }
  .status-div {
    width:100%;
    display:flex;
    justify-content:space-between;
  }
  h4 {
    color: ${props => props.theme.themeWhite};
    font-size:1.5rem;
    font-weight: normal;
  }
  p {
    
    color: ${props => props.theme.accent};  }
`;
const PremiumStyle = styled.div`
  color: ${props => props.theme.themeWhite};
  display: flex;
  justify-content: flex-start;
`;

const InputCheckStyle = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
const StripeStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;
