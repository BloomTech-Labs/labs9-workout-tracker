import React, { useState } from "react";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";

import barbell from "./assets/barbell.jpeg";

const Register = props => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const registerUser = e => {
    e.preventDefault();
    // Initialize Firebase
    console.log("email: ", email, "password: ", password, "name: ", name);
    if (password === confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          res.user
            .getIdToken()
            .then(token => {
              console.log(email, name, token)
              axios.post(
                "https://fitmetrix.herokuapp.com/auth/register",
                { email, name },
                { headers: { Authorization: token } }
              );
            })
            .then(props.history.push("/login"))
            .catch();
        })
        .catch(function(error) {
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      alert("Passwords must match!")
    }
  };

  return (
    <RegisterContainer>
      <Container>
        <FormStyle onSubmit={e => registerUser(e)}>
        <InputDiv>
        <p> Name:</p>  
        <InputStyle
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        </InputDiv>
        <InputDiv>
        <p>  Email:</p>
      
          <InputStyle
            type="text"
            placeholder="example@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          </InputDiv>
          <InputDiv>
          <p>  Password:</p>
          
          <InputStyle
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          </InputDiv>
          <InputDiv>
          <p> Confirm Password:</p>
          <InputStyle
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          </InputDiv>
          <Button type="submit">Sign Up</Button>
        </FormStyle>
      </Container>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: fixed;
  margin:0 auto;
  top: 0;
  left: 0;
  z-index: 0;
  background: no-repeat center center fixed;
  background-image: url(${barbell});
  background-size: cover;
`;

const Container = styled.div`
margin: 0 auto;
height: auto;
margin-top: 200px;
display:flex;
justify-content: center;
align-items:center;
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

  const InputDiv = styled.div`
  margin-top:20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
    p {
    color:white;
  }
  `;
const InputStyle = styled.input`
  font-family: ${props => props.theme.roboto};
  height: 30px;
  background-color: ${props => props.theme.themeWhite};
  width:100%;
  width:150px;
`;

const Button = styled.button`
  height: 40px;
  width: 80%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: ${props => props.theme.roboto};
  font-weight: bold;
  font-size: 1.5rem;
  background-color: ${props => props.theme.primaryLight};
  border-radius: 6px;
  &:hover {
    color: ${props => props.theme.accent};
  }
`;
