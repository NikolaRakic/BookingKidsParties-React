import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./stripe.css"
import CheckoutForm from "./CheckoutForm";
import { StripeClient } from "../../services/Clients/StripeClient";


const stripePromise = loadStripe(
  "pk_test_51L96moCadxqwLTZTJRbVG7LOzft2d45zH2EmZZrerKtp8bvnM1ouUQBpUUsSmqv3zK7dsdoU4gnwuR2n4vsWPY7d00BzoAkhG5"
);

export default function StripeForm(props) {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState();
  const additionalInformations = props.additionalInformations;

  useEffect(() => {
    stripePayment(additionalInformations, props.amount)
  }, []);

  const stripePayment = async (additionalInformations, amount) => {
    try {
      const data = await StripeClient.createPayment(additionalInformations.name, additionalInformations.email, amount);
      setClientSecret(data.data.clientSecret);
      setPaymentIntentId(data.data.paymentIntentId)
    } catch (error) {
      alert("Greska! " + error);
    }
  };

  const appearance = {
    theme: "flat",
  };
  const options = {
    clientSecret: clientSecret,
    appearance
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} paymentIntentId={paymentIntentId} additionalInformations={additionalInformations}amount={props.amount}/>
        </Elements>
      )}
    </div>
  );
}
