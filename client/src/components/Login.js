import React, { useState, useContext } from "react";
import { Store } from "../index";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";
import Input from '../shared/Input';

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
      <Container>
        <SideImage/>

        <FormContainer>
          <FormStyle onSubmit={e => loginUser(e)}>
            <Input 
              size="large"
              value={email}
              placeholder="example@example.com"
              label="Email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              labelColor="white"
            />
            <Input 
              size="large"
              value={password}
              placeholder="password"
              label="Password"
              name="password"
              labelColor="white"
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Sign In</Button>
          </FormStyle>
        </FormContainer>
      </Container>
  );
};

export default Login;

const FormContainer = styled.div`
  width: calc(100% - 460px);
  height: 100%;
  margin-left: 460px;
`;

const SideImage = styled.div`
  width: 460px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: no-repeat center center fixed;
  background-image: url(${ropeImg});
  background-size: cover;
`;


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 54px;
  left: 0;
  display:flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FormStyle = styled.form`
  
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
