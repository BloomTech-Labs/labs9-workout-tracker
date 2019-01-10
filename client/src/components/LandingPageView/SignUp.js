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

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Div>
        <FormStyle>
            <InputStyle type="text" placeholder="Username"  />
            <InputStyle type="text" placeholder="Password" />
          </FormStyle>>
        <Button>Sign Up</Button>
      </Div>
    )
  }
}

export default SignUp