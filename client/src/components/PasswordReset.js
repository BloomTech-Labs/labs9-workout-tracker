import React, { useState, useContext } from 'react';
import { Store } from '../index';
import firebase from 'firebase';
import styled from 'styled-components';
import axios from 'axios';
import Loading from './Loading';
import Button from '../shared/Button';
import ropeImg from './assets/rope.jpg';
import qs from 'qs';

const PasswordReset = props => {
  const { state, dispatch } = useContext(Store);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const SendPasswordReset = e => {
    e.preventDefault();

    const hash = window.location.hash;
    const query = qs.parse(hash.replace('#', ''));

    console.log(query);

    // // Initialize Firebase
    // firebase
    //   .auth()
    //   .updatePassword(password)
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //     props.history.push('/login');
    //   })
    //   .catch(error => {
    //     console.log(error.code, error.message);
    //   });
  };

  return (
    <Container>
      <SideImage />
      <FormContainer>
        {loading ? (
          <Loading />
        ) : (
          <FormStyle onSubmit={e => SendPasswordReset(e)}>
            {/* {state.userJustRegistered ? <RegisterSuccess>Succesfully Registered! Please Login</RegisterSuccess> : null} */}
            <h1>Forgot your password?</h1>
            <p>Enter your email address below and we'll get you back to working out.</p>
            {/* {error ? <StyledError>Oops! That email / password combination is not valid.</StyledError> : null} */}
            <InputContainer>
              <h3>Password</h3>
              <input
                type="text"
                value={password}
                placeholder="Enter Password"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </InputContainer>

            <InputContainer>
              <h3>Confirm Password</h3>
              <input
                type="text"
                value={password}
                placeholder="Enter Password"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </InputContainer>

            <ButtonContainer>
              <Button type="submit">Request Reset Link</Button>
            </ButtonContainer>
          </FormStyle>
        )}
      </FormContainer>
    </Container>
  );
};

export default PasswordReset;

const RegisterSuccess = styled.p``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledError = styled.p``;

const InputContainer = styled.div`
  color: #5f697a;
  width: 100%;
  margin-bottom: 23px;
  h3 {
    display: block;
    font-weight: 700;
    font-size: 1.1rem;
    color: #434c5e;
    margin-bottom: 8px;
    text-align: left;
    letter-spacing: 1px;
    font-family: 'Open Sans';
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
    margin-bottom: 50px;
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
  font-family: 'Open Sans';
  overflow: auto;
`;
