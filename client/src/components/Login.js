import React, { useState, useContext } from "react";
import { Store } from "../index";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";
// import Input from '../shared/Input';

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
            <h1>Sign into fitmetrix.</h1>
            <p>Enter details below</p>
            
            <InputContainer>
              <h3>EMAIL ADDRESS</h3>
              <input
                type="text"
                value={email}
                placeholder="jack@fitmetrix.me"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </InputContainer>

            <InputContainer>
              <h3>PASSWORD</h3>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </InputContainer>

            <Button type="submit">Sign In</Button>
          </FormStyle>
        </FormContainer>
      </Container>
  );
};

export default Login;


const InputContainer = styled.div`
  color: #5f697a;
  width: 100%;
  margin-bottom: 23px;
  h3 {
    display: block;
    font-weight: 700;
    font-size: 11px;
    color: #434C5E;
    margin-bottom: 8px;
    text-align: left;
    letter-spacing: 1px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
  input {
    border: 1px solid #D4D9E2;
    border-radius: 3px;
    padding: 15px;
    font-size: 14px;
    color: #596377;
    outline: 0;
    width: 100%;
    &::-webkit-input-placeholder {
      opacity: 0.50;
    }
  }
`

const Button = styled.button`
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  display: inline-block;
  margin: 20px auto;
  background: ${props => props.theme.accent};
  border-radius: 100px;
  height: 50px;
  line-height: 50px;
  padding: 0 60px;
  font-size: 12px;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;
  transition: box-shadow .2s ease,border .2s ease;
  transition: box-shadow .2s ease,border .2s ease,-webkit-box-shadow .2s ease;
  &:hover {
    box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.2)
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  max-width: 540px;
  margin: 0 auto;
  h1 {
    font-size: 28px;
    font-weight: 400;
    color: #434C5F;
  }
  p {
    display: block;
    font-size: 16px;
    color: #596377;
    font-weight: 400;
    margin-bottom: 50px;
  }
`;

const FormContainer = styled.div`
  width: calc(100% - 460px);
  height: 100%;
  margin-left: 460px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  @media (max-width: 1076px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const SideImage = styled.div`
  width: calc(460px + 150px);
  height: 100%;
  position: absolute;
  top: 0;
  left: -150px;
  background: no-repeat left left fixed;
  background-image: url(${ropeImg});
  background-size: cover;
  @media (max-width: 1076px) {
    width: 0px;
  }
`;


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display:flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Open Sans";
`;

