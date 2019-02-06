import React, { useState } from "react";
import styled from "styled-components";
import StripeButton from "./BillingView.js";
import axios from "axios";
import * as firebase from "firebase";
import requireAuth from "../../requireAuth";
import MainSettings from "./MainSettings";
import "./settings.css";
import FormInputTwo from '../../shared/FormInputTwo'
import FormInput from '../../shared/FormInput'
import Button from '../../shared/Button';
//working on updating info

const SettingsView = props => {
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState(props.user.phone);
  const [recieves_email, setRecieveEmail] = useState(props.user.recieves_email);
  const [premium, displayPremium] = useState(props.user.premium);
  const [newPassword, setPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const logOut = () => {
    setLoggedOut(true);
    window.localStorage.removeItem('login_token');
    firebase.auth().signOut();
    props.history.push('/');
  };

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
          <FormInput 
            label={"Verify password"}
            value={currentPassword}
            placeholder={"Enter Password"}
            onChange={e => setcurrentPassword(e.target.value)}
            type="password"
            lableColor="#2B3A42"
            secureTextEntry={true}
          />
          <ResponsiveBtn>
          <Button>Update Info</Button>
          </ResponsiveBtn>
          </ChangePasswordDiv>
      );
    } else {
      return (
        <LogOutDiv>
        <ChangePasswordDivInvis>
          <FormInput 
            label={"Verify password"}
            value={currentPassword}
            placeholder={"Enter Password"}
            onChange={e => setcurrentPassword(e.target.value)}
            type="password"
            lableColor="#2B3A42"
            secureTextEntry={true}
          />
          <Button>Update Info</Button>
        </ChangePasswordDivInvis>
        <StyledBtn onClick={() => logOut()}>Logout</StyledBtn>
        </LogOutDiv>
      );
    }
  };

  const renderPremium = () => {
    if (props.user.premium === true) {
      return (
        <PremiumDiv>
          <div className="status-div">
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
          <FormInput 
            label={"Email"}
            value={email}
            placeholder={"jack@fitmetrix.me"}
            onChange={e => setEmail(e.target.value)}
            type="email"
            lableColor="#2B3A42"
          />
          <FormInputTwo 
            label={"Phone"}
            value={phone}
            placeholder={"555-555-555"}
            onChange={e => setPhone(e.target.value)}
            type="tel"
            lableColor="#2B3A42"
          />
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

const ResponsiveBtn = styled.div`
  @media (max-width:768px) {
    width: 92%;
  }
  @media (max-width:375px) {
    width:77%;
  }
  @media (max-width:414px) {
    width:70%;
  }
`;

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
  padding-bottom: 100px;
`;

const FormStyle = styled.form`
  border-radius: 0 0 6px 6px;
  background-color: white;;
  margin: 0 2%;
  display: flex;
  width: 70%;
  flex-direction: column;
  padding: 20px 7%;
  align-items: center;
  border-top: 0px;
  @media (max-width: 550px) {
    width:100%;
  }
`;

const ChangePasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  transition: 0.4s ease-in
  @media (max-width: 550px) {
    width: 100%;
  }
`;

const ChangePasswordDivInvis = styled.div`
  display: flex;
  display:none
  flex-direction: column;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  transition: 0.4s ease-in
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
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
`;

const LabelStyle = styled.label`
  display: flex;
  align-self: flex-start;
  color: ${props => props.theme.primaryDark};
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
    
    color: ${props => props.theme.accent}; 
    margin:0;
    font-weight:bold
  }
`;
const PremiumStyle = styled.div`
  color: #2B3A42
  display: flex;
  justify-content: flex-start;
`;

const StripeStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const StyledBtn = styled.button`
width:42%;
text-transform: uppercase;
letter-spacing: 1px;
display: inline-block;
height: 50px;
line-height: 50px;
padding: 0 50px;
font-size: 12px;
font-weight: 700;
transition: box-shadow .2s ease,border .2s ease,-webkit-box-shadow .2s ease;
border-radius: 100px;
outline: none;
background: white;
border: none;
color: #FD8F25;
margin:20px 0;
border: 1px solid #FD8F25
@media(max-width:414px){
  width:65%;
}
@media(max-width:375px){
  width:70%;
}
`;

const LogOutDiv = styled.div`
width:100%;
`;

