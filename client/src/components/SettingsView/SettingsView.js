import React, { useState, useContext, useEffect } from "react";
import { Store } from '../../index';
import styled from "styled-components";
import StripeButton from "./BillingView.js";
import axios from "axios";
import * as firebase from "firebase";
import requireAuth from "../../requireAuth";
import "./settings.css";
import FormInputTwo from '../../shared/FormInputTwo'
import FormInput from '../../shared/FormInput'
import Button from '../../shared/Button';
//working on updating info

const SettingsView = props => {


  const { state, dispatch } = useContext(Store)

  const [email, setEmail] = useState(state.email);
  const [phone, setPhone] = useState(state.phone);
  const [recieves_email, setRecieveEmail] = useState(state.recieves_email);
  const [currentPassword, setcurrentPassword] = useState("");
  const [settingsUpdated, setSettingsUpdated] = useState(false)

  useEffect(() => {
    setEmail(state.email)
    setPhone(state.phone)
    setRecieveEmail(state.recieves_email)
  }, [state])

  const logOut = () => {
    window.localStorage.removeItem('login_token');
    firebase.auth().signOut();
    props.history.push('/');
  };

  const updateUser = async e => {
    e.preventDefault();
    setSettingsUpdated(false)
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
              if (state.email !== email) {
                alert("Email has changed");
              }
              console.log(res.data);
              dispatch({ type: "USER_MODEL", payload: res.data });

              setcurrentPassword("");
              setSettingsUpdated(true)
            }
          })
      })
      .catch(error => {
        alert("not sure of this catch");
      });
  };

  

  const renderVerifyPassword = () => {
    if (
      email !== state.email ||
      phone !== state.phone ||
      recieves_email !== state.recieves_email
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
    if (state.premium === true) {
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
      state.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  return (
    <ContainerDiv>
      <SettingsViewStyle>
        { settingsUpdated ? <SettingsUpdated>Settings Updated Successfully!</SettingsUpdated>: <SettingsUpdatedHidden>Settings Updated Successfully!</SettingsUpdatedHidden>}
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
`;

const SettingsUpdated = styled.p`
color:green;
text-align:center;
background-color:lightgreen;
border-radius: 5px;
width: 56%;
margin-top:10px;
`;

const SettingsUpdatedHidden = styled(SettingsUpdated)`
visibility:hidden;
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
  transition: 0.4s ease-in;
  @media (max-width: 550px) {
    width: 100%;
  }
`;

const ChangePasswordDivInvis = styled.div`
  display: flex;
  display:none;
  flex-direction: column;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  transition: 0.4s ease-in;
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const RecEmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  width: 100%;
  align-items: center;
  margin-bottom:20px;

  @media (max-width: 550px) {
    width: 100%;
  }
  .status-div {
    width:100%;
    display:flex;
    justify-content:space-between;
    margin-bottom:20px;
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
  color: #2B3A42;
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
text-transform: uppercase;
letter-spacing: 1px;
display: inline-block;
height: 50px;
line-height: 50px;
padding: 0 50px;
font-size: 1.2rem;
font-weight: 700;
transition: box-shadow .2s ease,border .2s ease,-webkit-box-shadow .2s ease;
border-radius: 100px;
outline: none;
background: white;
border: none;
color: #FD8F25;
margin:20px 0;
border: 2px solid #FD8F25;
:hover {
  cursor:pointer;
}
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

