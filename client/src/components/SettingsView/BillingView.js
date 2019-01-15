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
      .post("http://localhost:9002/api/settings/payment", body)
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
      // image="https://www.vidhub.co" //Pop-in header image
      billingAddress={false} //asks for less info. Delete to ask for billing address
    />
  );
};
export default StripeButton;

