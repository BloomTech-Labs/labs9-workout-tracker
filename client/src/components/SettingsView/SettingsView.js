import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StripeButton from './BillingView.js';
import axios from "axios";

const SettingsView = (props) =>  {
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState(props.user.phone);
  const [recieves_email, setRecieveEmail] = useState(props.user.recieves_email)
  const [premium, displayPremium] = useState(props.user.premium);
  // const value = target.type === 'checkbox' ? target.checked : target.value;

  const updateUser = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('login_token');

    if (token !== undefined) {
      const res = await axios.put(
        'http://localhost:9001/api/user/edit',
        {email, phone, recieves_email},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
      );
      console.log(res.data);
    }
  }

  return (
      <SettingsViewStyle>
        <FormStyle onSubmit={e => updateUser(e)}> 
          <Div>
            <LabelStyle>Email:</LabelStyle>
            <InputStyle type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Div>
          <Div>
            <LabelStyle>Phone:</LabelStyle>
            <InputStyle type="text" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /> 
          </Div>
          <Div>
            <LabelStyle>Recieve Email</LabelStyle>
            <input name='Recieve Email' type="checkbox" checked={recieves_email} onChange={(e) => setRecieveEmail(e.target.checked)} /> 
          </Div>
          <ButtonDiv>
            <Button>Submit</Button>
            <StripeButton />
          </ButtonDiv>
        </FormStyle>

      </SettingsViewStyle>
  );
}
  
  
  
  export default SettingsView;

  
const SettingsViewStyle = styled.div`
width: 100%;
max-width: 880px;
display: flex;
padding-bottom: 100px;
position: absolute;
top: 74px;
font-size:1.6rem;
`;

const FormStyle = styled.form`
display:flex;
flex-direction: column;
justify-content:space-evenly;
height:350px;
width:50%;
`;

const EmailStyle = styled.div`
display:flex;
justify-content:space-around;
align-items:center;
`;

const InputStyle = styled.input`
width:40%;
height:40px;
border-radius:5px;
text-align:center;
`;

const Button = styled.button`
border-radius:5px;
height:40px;
color: white;
background:${props => props.theme.primaryDark};
font-weight:bold;
width:40%;
`;

const Div = styled.div`
display:flex;
align-items:center;
`;

const ButtonDiv = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:150px;
justify-content:space-around;
`;

const LabelStyle = styled.label`
width:25%;
`;

