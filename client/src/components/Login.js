import React, { useState } from "react";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";

import ropeImg from "./assets/rope.jpg";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = e => {
    e.preventDefault();
    // Initialize Firebase
    console.log("email: ", email, "password: ", password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        res.user
          .getIdToken()
          .then(idToken => {
            console.log(idToken);
            window.localStorage.setItem("login_token", idToken);
            axios
              .post(
                "http://localhost:9001/auth/login",
                {},
                { headers: { Authorization: idToken } }
              )
              .then(res => {
                console.log(res.data);
                props.dispatch({ type: "userModel", payload: res.data });
                props.history.push("/schedule");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error.code, error.message);
      });
  };

  return (
    <LoginContainer>
      <Container>
        <FormStyle onSubmit={e => loginUser(e)}>
          <InputStyle
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InputStyle
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
        </FormStyle>
      </Container>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 500px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background: no-repeat center center fixed;
  background-image: url(${ropeImg});
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
  margin-top: 30px;
  background-color: ${props => props.theme.themeWhite};
  margin-left: 20px;
  margin-right: 20px;
`;

const Button = styled.button`
  height: 40px;
  width: 30%;
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
