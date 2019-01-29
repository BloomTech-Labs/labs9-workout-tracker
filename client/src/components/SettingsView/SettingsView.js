import React, { useState } from "react";
import styled from "styled-components";
import StripeButton from "./BillingView.js";
import axios from "axios";
import * as firebase from 'firebase';
import requireAuth from '../../requireAuth';
//working on updating info

const SettingsView = props => {
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState(props.user.phone);
  const [recieves_email, setRecieveEmail] = useState(props.user.recieves_email);
  const [premium, displayPremium] = useState(props.user.premium);
  const [newPassword, setPassword] = useState('');
  const [currentPassword, setcurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [passwordFlag, setPasswordFlag] = useState(false)
  const [premiumFlag, setpremiumFlag] = useState(false)
  

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
      <div>
      

        <h1>Account</h1>
        <h1>Premium</h1>
        <h1>Password</h1>

      </div>
      <FormStyle onSubmit={e => updateUser(e)}>
        <Div>
          <LabelStyle>Email:</LabelStyle>
          <InputStyle
            type="text"
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
        <LabelStyle>Password:</LabelStyle>
          <InputStyle 
          type='password'
            value={currentPassword} 
            placeholder='Current Password' 
            autoCapitalize='none' 
            secureTextEntry={true}
            onChange={(e) =>  setcurrentPassword(e.target.value) } 
          />
          <InputStyle 
          type='password'
            value={newPassword} 
            placeholder='New Password' 
            autoCapitalize='none' 
            secureTextEntry={true}
            onChange={(e) =>  setPassword(e.target.value) } 
            />
            <Button title='Change Password'>Update Info</Button>

        </ChangePasswordDiv>
        <RecEmailDiv>
          <LabelStyle >Want to Recieve Email?</LabelStyle>
          <SliderLabel class="switch">
          <InputCheckStyle
            name="Recieve Email"
            type="checkbox"
            checked={recieves_email}
            onChange={e => setRecieveEmail(e.target.checked)}
          />
            <Slider class="slider"></Slider>
          </SliderLabel> 
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
const SliderLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

`;

const Slider = styled.span`
position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
  
  InputCheckStyle:checked + & {
    background-color: #2196F3;
  }
  
  InputCheckStyle:focus + &  {
    box-shadow: 0 0 1px #2196F3;
  }

  ::before {
    position: absolute;
    border-radius: 50%;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;

  
  InputCheckStyle:checked {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  }
`;

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
  position: absolute;
  top: 74px;
  font-size: 1.6rem;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  width: 70%;
  border: 1px solid blue;
  align-items:center;
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
