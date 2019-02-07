import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import styled from "styled-components";
import { Store } from "../../index";

const StripeButton = () => {
  const publishableKey = "pk_test_UoZqVOHUhJfAEAvXBPJyzYNZ";

  const { state, dispatch } = useContext(Store);

  const onToken = token => {
    const body = {
      amount: 500,
      token: token
    };
    axios
      .post("https://fitmetrix.herokuapp.com/api/settings/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
        dispatch({ type: "USER_MODEL", payload: { premium: true } });
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  return (
    <StyleCheckout
      label="Upgrade" //Component button text
      name="flexlog" //Modal Header
      description="Upgrade to a PRO account today!"
      panelLabel="Upgrade Monthly / " //Submit button in modal
      amount={499} //Amount in cents $5.00
      token={onToken}
      stripeKey={publishableKey}
      image="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" //Pop-in header image
      billingAddress={false} //asks for less info. Delete to ask for billing address
    >
      <StripeStyle>Upgrade Premium</StripeStyle>
    </StyleCheckout>
  );
};
export default StripeButton;

const StripeStyle = styled.button`
  width: 86%;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  padding: 0 50px;
  font-size: 1.2rem;
  font-weight: 700;
  transition: box-shadow 0.2s ease, border 0.2s ease,
    -webkit-box-shadow 0.2s ease;
  border-radius: 100px;
  outline: none;
  background: #fd8f25;
  border: none;
  color: #fff;
  :hover {
    cursor: pointer;
  }
`;

const StyleCheckout = styled(StripeCheckout)``;
