import React, { useState, useContext } from "react";
import { Store } from "../index";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";
import Loading from "./Loading";
import Button from "../shared/Button";
import qs from "qs";

const PasswordReset = props => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successfulReset, setSuccessful] = useState(false);

  const handleResetPassword = (auth, actionCode, continueUrl, lang) => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // let accountEmail;
    // Verify the password reset code is valid.
    auth
      .verifyPasswordResetCode(actionCode)
      .then(function(email) {
        // accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.

        // Save the new password.
        auth
          .confirmPasswordReset(actionCode, password)
          .then(function(resp) {
            // Password reset has been confirmed and new password updated.

            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);
            setSuccessful(true);
            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
          })
          .catch(function(error) {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
          });
      })
      .catch(function(error) {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        setError(true);
        setErrorMessage("Something went wrong please restart process");
      });
  };

  const SendPasswordReset = e => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    if (successfulReset === true) {
      props.history.push("/login");
    }

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords must match");
      return;
    }
    const hash = window.location.hash;
    const query = qs.parse(hash.replace("#", ""));

    console.log(query);

    // Get the one-time code from the query parameter.
    var actionCode = query.oobCode;
    // (Optional) Get the continue URL from the query parameter if available.
    var continueUrl = "http://localhost:3000/login";
    // (Optional) Get the language code if available.
    var lang = "en";

    var auth = firebase.auth();

    handleResetPassword(auth, actionCode, continueUrl, lang);

    setError(false);
    setErrorMessage("");
  };

  return (
    <Container>
      <FormContainer>
        {loading ? (
          <Loading />
        ) : (
          <FormStyle onSubmit={e => SendPasswordReset(e)}>
            {successfulReset ? (
              <>
                <h1>Successfully reset password</h1>
              </>
            ) : (
              <>
                <h1>Enter your new password</h1>
              </>
            )}
            {successfulReset ? null : (
              <>
                {error ? <StyledError>{errorMessage}</StyledError> : null}
                <InputContainer>
                  <h3>Password</h3>
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </InputContainer>

                <InputContainer>
                  <h3>Confirm Password</h3>
                  <input
                    type="password"
                    value={confirmPassword}
                    placeholder="Enter Password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </InputContainer>
              </>
            )}

            <ButtonContainer>
              <Button type="submit" size="responsive">
                {successfulReset ? "Go to Login" : "Submit"}
              </Button>
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
  padding: 0px 20px;
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
