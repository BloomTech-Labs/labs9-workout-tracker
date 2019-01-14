import React, { useState } from "react";
import firebase from "firebase";
import styled from "styled-components";
import axios from 'axios';

const Login = props => {
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
              axios.post('http://localhost:9001/auth/user', {idToken})
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  console.log(err)
                });
            }
          )
          .catch(err => console.log(err));
      })
      .catch((error) => {console.log(error.code, error.message)});
  };

  return (
    <Container>
      <FormStyle onSubmit={e => loginUser(e)}>
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
        <Button type="submit">Sign In</Button>
      </FormStyle>
    </Container>
  );
};

export default Login;

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
