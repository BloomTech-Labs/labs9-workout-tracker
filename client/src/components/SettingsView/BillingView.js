import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = () => {
  const publishableKey = "pk_test_UoZqVOHUhJfAEAvXBPJyzYNZ";
   
  const onToken = token => {
    const body = {
      amount:500,
      token: token
  };
  axios
      .post("http://localhost:9001/api/settings/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  return (
    <StripeCheckout
      label="Upgrade" //Component button text
      name="fitmetrix" //Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Upgrade" //Submit button in modal
      amount={500} //Amount in cents $5.00
      token={onToken}
      stripeKey={publishableKey}
      image="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" //Pop-in header image
      billingAddress={false} //asks for less info. Delete to ask for billing address
    />
  );
};
export default StripeButton;

