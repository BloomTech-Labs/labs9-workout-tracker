import React, { useState, useContext } from "react";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";
import Loading from './Loading';
import { Store } from '../index';

import barbell from "./assets/barbell.jpeg";


const Register = props => {

  const { state, dispatch } = useContext(Store);

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  
  const registerUser = e => {
    e.preventDefault();
    setError(false)
    setErrorMessage('')
    setLoading(true)
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
            .then(() => {
              dispatch({type: 'USER_JUST_REGISTERED', payload: true})
              setLoading(false)
              props.history.push("/login")
            })
        })
        .catch(function(error) {
          var errorMessage = error.message;
          console.log(errorMessage);
          setError(true)
          setErrorMessage(errorMessage)
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setLoading(false)
        });
    } else {
      setError(true)
      setErrorMessage('Passwords must match')
      setPassword('')
      setConfirmPassword('')
      setLoading(false)
    }
  };

  return (
      <Container>
        <SideImage/>
        <FormContainer>
          <FormStyle onSubmit={e => registerUser(e)}>
          {loading ? (<Loading/>) : (
            <>
              <h1>Start tracking now!</h1>
              <p>Enter details below</p>
              {error ? (<StyledError>{errorMessage}</StyledError>) : null}
              <InputContainer>
                <h3>EMAIL ADDRESS</h3>
                <input
                  type="email"
                  value={email}
                  placeholder="jack@fitmetrix.me"
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </InputContainer>

              <InputContainer>
                <h3>Name</h3>
                <input
                  type="text"
                  value={name}
                  placeholder="Jack"
                  onChange={e => setName(e.target.value)}
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

              <InputContainer>
                <h3>CONFIRM PASSWORD</h3>
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm your password"
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </InputContainer>
              <ButtonContainer>
                <Button type="submit">Register</Button>
              </ButtonContainer>
            </>
          )}
          </FormStyle>
        </FormContainer>
      </Container>
  );
};

export default Register;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledError = styled.p`
  
`;

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
  ${StyledError} {
    color: rgba(225,0,0,1);
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
  @media (max-width: 1076px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 80px;
  }
`;

const SideImage = styled.div`
  width: calc(460px + 260px);
  height: 100%;
  position: absolute;
  top: 0;
  left: -260px;
  background: no-repeat left left fixed;
  background-image: url(${barbell});
  background-size: cover;
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
  display:flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Open Sans";
  overflow: auto;
`;

