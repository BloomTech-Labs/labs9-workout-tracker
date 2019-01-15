import React, { useState } from "react";
import firebase from "firebase";
import styled from "styled-components";
import axios from "axios";

const Register = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerUser = e => {
    e.preventDefault();
    // Initialize Firebase
    console.log("email: ", email, "password: ", password, "name: ", name);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user
          .getIdToken()
          .then(token => {
            axios.post(
              "http://localhost:9001/auth/register",
              { email, name },
              { headers: { Authorization: token } }
            );
          })
          .then(props.history.push("/login"))
          .catch();
      })
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
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
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
