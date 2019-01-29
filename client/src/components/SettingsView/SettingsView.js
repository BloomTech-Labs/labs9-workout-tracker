import React, { useState } from "react";
import styled from "styled-components";
import StripeButton from "./BillingView.js";
import axios from "axios";
import * as firebase from 'firebase';
import requireAuth from '../../requireAuth';
import MainSettings from './MainSettings';
import './settings.css';
//working on updating info

const SettingsView = props => {
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState(props.user.phone);
  const [recieves_email, setRecieveEmail] = useState(props.user.recieves_email);
  const [premium, displayPremium] = useState(props.user.premium);
  const [newPassword, setPassword] = useState('');
  const [currentPassword, setcurrentPassword] = useState('');

  

  const updateUser = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(email).then( async () => {
        if (token !== undefined) {
          const res = await axios.put(
            "https://fitmetrix.herokuapp.com/api/user/edit",
            { email, phone, recieves_email },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            },
            
          );
          if (props.user.email !== email) {
            alert("Email has changed")
          }
          console.log(res.data); 
          props.dispatch({type: 'USER_MODEL', payload:res.data})
          if (email === props.user.email) {
            changePasswordPress();
          } 
          setPassword('');
          setcurrentPassword('');
        }
    }).catch((error) => {
        alert('Reformat email to update email');
    })

    }).catch((error) => {
      alert('not sure of this catch');
    })
  };

  const renderPremium = () => {
    if (props.user.premium === true) {
      return <PremiumStyle>You are premium</PremiumStyle>;
    } else {
      return  (
      <StripeStyle>
        <StripeButton />;
      </StripeStyle>
      )}
  };

  const changePasswordPress = () => {
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
      alert('Password was changed');
    }).catch((error) => {
        alert( 'changePasswordPress function error/Password should be 6 characters or more');
    })

    }).catch((error) => {
      alert(error.message, 'error message catch 2 for password');
    })
  }

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(props.user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  

  return (
    <ContainerDiv>
    <SettingsViewStyle>
      <FormStyle onSubmit={e => updateUser(e)}>
        <Div>
          <LabelStyle>Email:</LabelStyle>
          <InputStyle
            type="text"
            placholder='hello'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Div>
        <Div>
          <LabelStyle>Phone:</LabelStyle>
          <InputStyle
            type="text"
            placeholder={phone}
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Div>
       
        <ChangePasswordDiv>
          <InputStyle 
          type='password'
            value={currentPassword} 
            placeholder='Current Password' 
            autoCapitalize='none' 
            secureTextEntry={true}
            onChange={(e) =>  setcurrentPassword(e.target.value) } 
          />

        </ChangePasswordDiv>
        <RecEmailDiv>
          <LabelStyle >Want to Recieve Email?</LabelStyle>
          <label className="switch">
            <input type="checkbox" 
                    name="Recieve Email"
                  checked={recieves_email}
                    onChange={e => setRecieveEmail(e.target.checked)}/>
              <span className="slider round"></span>
          </label>
        </RecEmailDiv>
        <ButtonDiv>
          {renderPremium()}
        </ButtonDiv>
      </FormStyle>
    </SettingsViewStyle>
    </ContainerDiv>
  );
};

export default requireAuth(SettingsView);


const ContainerDiv = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
`;

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction:column;
  justify-content:center;
  padding-bottom: 100px;
  font-size: 1.6rem;
`;

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

const InputStyle = styled.input`
  height: 40px;
  border-radius: 5px;
  text-align: center;
  display:flex;
  justify-content:center;
  width:60%;
  min-width:161.438px;
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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width:60%;
`;
const ChangePasswordDiv = styled.div`
display: flex;
flex-direction: column;
align-items:center;
width:60%;
  justify-content:space-evenly;
  height:200px;
`;
const RecEmailDiv = styled.div`
  display:flex;
  width:50%;
  justify-content:center;

`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  justify-content: space-around;
  align-items:center;

`;

const LabelStyle = styled.label`
  width: 40%;
`;

const PremiumStyle = styled.div`
color:${props => props.theme.accent};
display: flex;
justify-content: flex-start;
padding-left: 5%;
`;

const InputCheckStyle = styled.input`
opacity: 0;
width: 0;
height: 0;
`;
const StripeStyle = styled.div`
display:flex;
justify-content:center;
width:100%;
`;
