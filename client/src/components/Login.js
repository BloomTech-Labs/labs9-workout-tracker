import React, { useState, useContext } from "react";
import { Store } from "../index";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";
import Loading from "./Loading";
import Button from "../shared/Button";

import ropeImg from "./assets/rope.jpg";

const Login = props => {
  const { state, dispatch } = useContext(Store);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginUser = e => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    // Initialize Firebase
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        res.user.getIdToken().then(idToken => {
          window.localStorage.setItem("login_token", idToken);
          axios
            .get("https://fitmetrix.herokuapp.com/api/user", {
              headers: { Authorization: idToken }
            })
            .then(res => {
              console.log(res.data);
              dispatch({ type: "USER_MODEL", payload: res.data });
              dispatch({ type: "USER_JUST_REGISTERED", payload: false });
              dispatch({ type: "PASSWORD_RESET" });
              setLoading(false);
              props.history.push("/workouts");
            });
        });
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        dispatch({ type: "USER_JUST_REGISTERED", payload: false });
        dispatch({ type: "PASSWORD_RESET" });
        console.log(error.code, error.message);
      });
  };

  const onForgot = e => {
    console.log("in onForgot");
    props.history.push("/forgot");
  };

  return (
    <Container>
      <SideImage />
      <FormContainer>
        {loading ? (
          <Loading />
        ) : (
          <FormStyle onSubmit={e => loginUser(e)}>
            {state.userJustRegistered ? (
              <RegisterSuccess>
                Succesfully Registered! Please Login
              </RegisterSuccess>
            ) : null}
            <h1>Sign into FLEXLOG</h1>
            <p>Enter details below</p>
            {state.passwordReset === true ? (
              <ResetText>
                If there's a FLEXLOG account linked to this email address, we'll
                send over instructions to reset your password.
              </ResetText>
            ) : null}
            {error ? (
              <StyledError>
                Oops! That email / password combination is not valid.
              </StyledError>
            ) : null}
            <InputContainer>
              <h3>EMAIL ADDRESS</h3>
              <input
                type="text"
                value={email}
                placeholder="jack@flexlog.app"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </InputContainer>

            <InputContainer>
              <h3>PASSWORD</h3>
              <p onClick={e => onForgot({ email })}>Forgot password ?</p>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </InputContainer>
            <ButtonContainer>
              <Button type="submit">Sign In</Button>
            </ButtonContainer>
          </FormStyle>
        )}
      </FormContainer>
    </Container>
  );
};

export default Login;

const RegisterSuccess = styled.p``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ResetText = styled.p`
  width: 100%;
  font-size: 1.4rem !important;
  text-align: left;
  color: ${props => props.theme.accent} !important;
`;

const StyledError = styled.p``;

const InputContainer = styled.div`
  color: #5f697a;
  width: 100%;
  margin-bottom: 23px;
  position: relative;
  h3 {
    display: block;
    font-weight: 700;
    font-size: 1.1rem;
    color: #434c5e;
    margin-bottom: 8px;
    text-align: left;
    letter-spacing: 1px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
  input {
    border: 1px solid #d4d9e2;
    border-radius: 3px;
    padding: 15px;
    font-size: 1.4rem;
    color: #596377;
    outline: 0;
    width: 100%;
    &::-webkit-input-placeholder {
      opacity: 0.5;
    }
  }
  p {
    position: absolute;
    right: 0;
    top: 0px;
    font-size: 1.2rem !important;
    color: #8c96a9;
    font-weight: 400;
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  max-width: 540px;
  h1 {
    font-size: 2.8rem;
    font-weight: 400;
    color: #434c5f;
  }
  p {
    display: block;
    font-size: 1.6rem;
    color: #596377;
    font-weight: 400;
    margin-bottom: 20px;
  }
  ${StyledError} {
    color: rgba(225, 0, 0, 1);
    margin-bottom: 20px;
  }
  ${RegisterSuccess} {
    color: ${props => props.theme.accent};
    margin-bottom: 20px;
  }
`;

const FormContainer = styled.div`
  width: calc(100vw - 460px);
  margin-top: 100px;
  margin-left: 460px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 72px);
  @media (max-width: 1076px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 80px;
  }
`;

const SideImage = styled.div`
  width: calc(460px + 260px);
  height: 100%;
  position: fixed;
  top: 0;
  left: -260px;
  background: no-repeat left left fixed;
  background-image: url(${ropeImg});
  background-size: cover;
  background-position-x: 110px;
  @media (max-width: 1076px) {
    width: 0px;
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Open Sans";
  overflow: auto;
`;
