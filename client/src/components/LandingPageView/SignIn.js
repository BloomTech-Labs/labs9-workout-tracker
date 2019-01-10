import React from 'react';

import styled from 'styled-components'

const Div = styled.div`
  margin: 20px;
  height: auto;
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

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Div>
        <FormStyle>
            <InputStyle type="text" placeholder="Email" name="email" />
            <InputStyle type="text" placeholder="Password" name="password" />
          </FormStyle>>
        <Button>Sign In</Button>
      </Div>
    )
  }
}

export default SignIn