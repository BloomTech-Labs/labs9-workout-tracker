import React from "react";
import styled from "styled-components";

const BillingViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
`;

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

class BillingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BillingViewStyle>
        <Div>
          <FormStyle>
            <InputStyle type="text" placeholder="CC#" name="ccnumber" />
            <InputStyle type="text" placeholder="EXP" name="expiration" />
            <InputStyle type="text" placeholder="CVV" name="cvv" />
          </FormStyle>
          <Button>Buy Now</Button>
        </Div>
      </BillingViewStyle>
    );
  }
}

export default BillingView;
