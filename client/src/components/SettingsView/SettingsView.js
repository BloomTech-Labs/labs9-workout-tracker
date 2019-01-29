import React, { useState, useContext } from "react";
import styled from "styled-components";
import StripeButton from "./BillingView.js";
import axios from "axios";
import * as firebase from 'firebase';
import requireAuth from '../../requireAuth';
import { Store } from '../../index';
//working on updating info

const SettingsView = props => {
  const { state, dispatch } = useContext(Store)
  // const [email, setEmail] = useState(props.user.email);
  // const [phone, setPhone] = useState(props.user.phone);
  // const [recieves_email, setRecieveEmail] = useState(props.user.recieves_email);
  // const [premium, displayPremium] = useState(props.user.premium);
  const [newPassword, setPassword] = useState('');
  const [currentPassword, setcurrentPassword] = useState('');
  // const [newEmail, setNewEmail] = useState('');

  // const value = target.type === 'checkbox' ? target.checked : target.value;
  //essentially a component did mount

  const updateUser = async e => {
    e.preventDefault();
    const token = window.localStorage.getItem("login_token");
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(state.email).then( async () => {
        if (token !== undefined) {
          const res = await axios.put(
            "https://fitmetrix.herokuapp.com/api/user/edit",
            state.email, state.phone, state.recieves_email,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            },
            
          );
          if (state.email !== e.target.value) {
            alert("Email has changed")
          }
          console.log(res.data); 
          dispatch({type: 'UPDATE_SETTINGS_FORM', payload:res.data})
          if (e.target.value === state.email) {
            changePasswordPress();
          } 
          dispatch({ type: "UPDATE_SETTINGS_FORM"})
          
        }
    }).catch((error) => {
        alert('Reformat email to update email');
    })

    }).catch((error) => {
      alert('user not updated');
    })
  };

  const renderPremium = () => {
    if (state.premium === true) {
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
        alert(error.message, 'changePasswordPress function error');
    })

    }).catch((error) => {
      alert(error.message, 'error message catch 2 for password');
    })
  }

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(state.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  const setData = e => {
    const value = e.target.value;

    setcurrentPassword({value: currentPassword });
    setPassword({ value: newPassword });

  };

  const updateCheck = e => {
    const value = e.target.value;
    dispatch({
      type: "UPDATE_SETTINGS_FORM",
      payload: value
    })
    console.log('hey')
  }

  

  return (
    <ContainerDiv>
    <SettingsViewStyle>
      <FormStyle onSubmit={e => updateUser(e)}>
        <Div>
          <LabelStyle>Email:</LabelStyle>
          <InputStyle
            type="text"
            placeholder="email"
            value={state.email}
            onChange={e => setData(e)}
          />
        </Div>
        <Div>
          <LabelStyle>Phone:</LabelStyle>
          <InputStyle
            type="text"
            placeholder="phone"
            value={state.phone}
            onChange={e => setData(e)}
          />
        </Div>
       
        <ChangePasswordDiv>
          <InputStyle 
          type='password'
            value={state.currentPassword} 
            placeholder='Current Password' 
            autoCapitalize='none' 
            secureTextEntry={true}
            onChange={(e) =>  setData(e) } 
          />
          <InputStyle 
          type='password'
            value={state.newPassword} 
            placeholder='New Password' 
            autoCapitalize='none' 
            secureTextEntry={true}
            onChange={(e) =>  setData(e) } 
            />
            <Button title='Change Password'>Update Info</Button>

        </ChangePasswordDiv>
        <RecEmailDiv>
          <LabelStyle>Want to Recieve Email?</LabelStyle>
          <InputCheckStyle
            name="Recieve Email"
            type="checkbox"
            checked={state.recieves_email}
            onChange={e => updateCheck(e)}
          />
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
  margin-left: 18%;
  margin-top:15px;
`;
const StripeStyle = styled.div`
display:flex;
justify-content:center;
width:100%;
`;
