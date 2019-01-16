import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import StripeButton from './BillingView.js';
import axios from "axios";

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  padding-bottom: 100px;
  position: absolute;
  top: 74px;
`;

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
`;

const LabelDivStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputStyle = styled.input`
  height: 20px;
`;

const FormStyle = styled.form`
  width: 40%;
  margin-left: 5%;
`;

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: '',
      phone: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
      
componentDidMount() {
  this.setState({user: this.props.user})
}


handleInputChange = e => {
  this.setState({ [e.target.name]: e.target.value });
}; 

handleSaveInfo = e => {
  e.preventDefault();
  axios
.put("http://localhost:9001/api/user/edit", {
  email: this.state.email,
  phone: this.state.phone
})
.then(response => {
  this.setState({email: '', phone: ''})
})
.catch(err => err)  

}

// const token = window.localStorage.getItem("login_token");

  render() {

    return (
      <SettingsViewStyle>
        <FormStyle>
          <LabelStyle>
            <LabelDivStyle>
              <p>Email:</p>
              <InputStyle
                type="text"
                name="email"
                value={this.state.email}
                placeholder="user@example.com"
                onChange={this.handleInputChange}
                />
            </LabelDivStyle>
            <LabelDivStyle>
              <p>Phone:</p>
              <InputStyle type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange}  />
            </LabelDivStyle>
            <LabelDivStyle>
              <input type="checkbox" name="email_box" value={this.props.recieves_email} />
              <p>Emails?</p>
              <input type="checkbox" name="text_box" value={this.props.recieves_text} />
              <p>Texts?</p>
            </LabelDivStyle>           
          </LabelStyle>
          <button  value="Save" onClick={this.handleSaveInfo}>Submit</button>
        </FormStyle>
        <StripeButton />
      </SettingsViewStyle>
    );
  }
}
  
  
  
  export default SettingsView;
