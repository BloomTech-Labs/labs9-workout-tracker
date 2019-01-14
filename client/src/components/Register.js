import React, { useState } from "react";
import firebase from "firebase";
import styled from "styled-components";

const Register = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = e => {
    e.preventDefault();
    // Initialize Firebase
    console.log("email: ", email, "password: ", password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <Container>
      <FormStyle onSubmit={e => registerUser(e)}>
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
        <Button type="submit">Sign Up</Button>
      </FormStyle>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  margin: 20px;
  height: auto;
  position: absolute;
  top: 74px;
`;

const FormStyle = styled.form`
  border: 1px solid black;
  margin-bottom: 30px;
`;

const InputStyle = styled.input``;

const Button = styled.button`
  height: 40px;
  width: 30%;
`;
