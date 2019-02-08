import React, { useState, useContext } from "react";
import { Store } from "../index";
import firebase from "firebase";
import styled from "styled-components";
import Loading from "./Loading";
import Button from "../shared/Button";

const ForgotPassword = props => {
  const { state, dispatch } = useContext(Store);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordReset, setPasswordReset] = useState(false);

  const SendPasswordEmail = e => {
    e.preventDefault();
    setError(false);

    // Initialize Firebase
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(res => {
        dispatch({ type: "PASSWORD_RESET" });
        props.history.push("/login");
      })
      .catch(error => {
        console.log(error.code, error.message);
        setPasswordReset(true);
        props.history.push("/login");
        dispatch({ type: "PASSWORD_RESET" });
      });
  };

  return (
    <Container>
      <FormContainer>
        {loading ? (
          <Loading />
        ) : (
          <FormStyle onSubmit={e => SendPasswordEmail(e)}>
            <h1>Forgot your password?</h1>
            <p>
              Enter your email address below and we'll get you back to working
              out.
            </p>

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

            <ButtonContainer>
              <Button type="submit" size="responsive">
                Request Reset Link
              </Button>
            </ButtonContainer>
          </FormStyle>
        )}
      </FormContainer>
    </Container>
  );
};

export default ForgotPassword;

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
    text-align: center;
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
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 540px;
  padding: 0px 20px h1 {
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
  width: 100vw;
  margin-top: 100px;
  margin: 0 auto;
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
