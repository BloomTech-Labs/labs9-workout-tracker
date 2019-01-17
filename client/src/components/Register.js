import React, { useState } from "react";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";

import barbell from "./assets/barbell.jpeg";

const Register = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerUser = e => {
    e.preventDefault();
    // Initialize Firebase
    console.log("email: ", email, "password: ", password, "name: ", name);
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
  };

  return (
    <RegisterContainer>
      <Container>
        <FormStyle onSubmit={e => registerUser(e)}>
          <InputStyle
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InputStyle
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <InputStyle
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </FormStyle>
      </Container>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 500px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background: no-repeat center center fixed;
  background-image: url(${barbell});
  background-size: cover;
`;

const Container = styled.div`
  margin: 20px;
  height: auto;
  position: absolute;
  top: 25%;
  left: 40%;
`;

const FormStyle = styled.form`
  border: 1px solid ${props => props.theme.primaryDark};
  border-radius: 6px;
  background-color: ${props => props.theme.primary};
`;

const InputStyle = styled.input`
  font-family: ${props => props.theme.roboto};
  height: 30px;
  width: 145px;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: ${props => props.theme.themeWhite};
`;

const Button = styled.button`
  height: 40px;
  width: 20%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: ${props => props.theme.roboto};
  font-weight: bold;
  font-size: 1.5em;
  background-color: ${props => props.theme.primaryLight};
  border-radius: 6px;
  &:hover {
    color: ${props => props.theme.accent};
  }
`;
