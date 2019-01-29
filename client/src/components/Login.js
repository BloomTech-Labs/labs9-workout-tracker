import React, { useState, useContext } from "react";
import { Store } from "../index";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";

import ropeImg from "./assets/rope.jpg";

const Login = props => {
  const { state, dispatch } = useContext(Store);

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
              .get("https://fitmetrix.herokuapp.com/api/user", {
                headers: { Authorization: idToken }
              })
              .then(res => {
                console.log(res.data);
                dispatch({ type: "USER_MODEL", payload: res.data });
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
        <InputDiv>
        <p>Email:</p>
          <InputStyle
            type="text"
            placeholder="example@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
        <p>Password:</p>
          <InputStyle
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          </InputDiv>
          <Button type="submit">Sign In</Button>
        </FormStyle>
      </Container>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
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
  @media(max-width:450px) {
    display:flex;
    flex-direction:column;
    align-items:center;
    width:85%;
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
