import React from "react";
import SideNav from "./SideNav";
import styled from "styled-components";

const BillingViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
`;

class BillingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BillingViewStyle>
        BillingView
        <SideNav />
      </BillingViewStyle>
    );
  }
}

export default BillingView;
