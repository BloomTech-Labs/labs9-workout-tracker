import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StripeButton from "./BillingView.js";
import axios from "axios";
import * as firebase from 'firebase';
//working on updating info

const SettingsView = props => {
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState(props.user.phone);
  const [recieves_email, setRecieveEmail] = useState(props.user.recieves_email);
  const [premium, displayPremium] = useState(props.user.premium);
  const [newPassword, setPassword] = useState('');
  const [currentPassword, setcurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  // const value = target.type === 'checkbox' ? target.checked : target.value;

  useEffect(() => {
    props.getUserInfo();
  }, []);
  //essentially a component did mount

  const updateUser = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(email).then(() => {
      alert('Email was changed');
    }).catch((error) => {
        alert(error.message);
    })

    }).catch((error) => {
      alert(error.message);
    })


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
      console.log(res.data);
    }
  };

  const renderPremium = () => {
    if (props.user.premium === true) {
      return <PremiumStyle>You are premium</PremiumStyle>;
    } else {
      return <StripeButton />;
    }
  };

  const changePasswordPress = () => {
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
      alert('Password was changed');
    }).catch((error) => {
        alert(error.message);
    })

    }).catch((error) => {
      alert(error.message);
    })
  }

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(props.user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  

  return (
    <SettingsViewStyle>
      <FormStyle onSubmit={e => updateUser(e)}>
        <Div>
          <LabelStyle>Email:</LabelStyle>
          <InputStyle
            type="text"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Div>
        <Div>
          <LabelStyle>Phone:</LabelStyle>
          <InputStyle
            type="text"
            placeholder="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Div>
        <Div>
          <LabelStyle>Recieve Email</LabelStyle>
          <InputCheckStyle
            name="Recieve Email"
            type="checkbox"
            checked={recieves_email}
            onChange={e => setRecieveEmail(e.target.checked)}
          />
        </Div>
        <Div>
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
            <Button title='Change Password' onClick={() => changePasswordPress()}>Update Info</Button>

        </Div>
        <ButtonDiv>
          {renderPremium()}
        </ButtonDiv>
      </FormStyle>
    </SettingsViewStyle>
  );
};

export default SettingsView;

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  padding-bottom: 100px;
  position: absolute;
  top: 74px;
  font-size: 1.6rem;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 350px;
  width: 50%;
`;

const EmailStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const InputStyle = styled.input`
  width: 40%;
  height: 40px;
  border-radius: 5px;
  text-align: center;
`;

const Button = styled.button`
  border-radius: 5px;
  height: 40px;
  color: white;
  background: ${props => props.theme.primaryDark};
  font-weight: bold;
  width: 40%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  justify-content: space-around;
`;

const LabelStyle = styled.label`
  width: 40%;
`;

const PremiumStyle = styled.div`
color:${props => props.theme.accent}
display: flex;
justify-content: flex-start;
padding-left: 5%;
`;

const InputCheckStyle = styled.input`
  margin-left: 18%;
`;
