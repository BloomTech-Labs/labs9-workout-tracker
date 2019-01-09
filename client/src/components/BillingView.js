import React from "react";
import SideNav from "./SideNav";
import styled from "styled-components";

const BillingViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
`;

const Div = styled.div`
  border: 1px solid black;
`;

const FormStyle = styled.form``;

const Button = styled.button``;

class BillingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BillingViewStyle>
        <SideNav />
        <Div>
          <FormStyle />

          <Button value="Buy Now" />
        </Div>
      </BillingViewStyle>
    );
  }
}

export default BillingView;
