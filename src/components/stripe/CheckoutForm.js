import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import "./stripe.css"
import { ReservationService } from "../../services/ReservationService";
import { StripeClient } from "../../services/Clients/StripeClient";
import { TokenService } from "../../services/TokenService";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState(props.additionalInformations.email);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const [paymentIntent2, setPaymentIntent] = useState();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    setClientSecret(props.clientSecret)

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
      console.log("PAYMENT: " + JSON.stringify(paymentIntent))
      console.log(paymentIntent)
      setPaymentIntent(paymentIntent)
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const createReservation = async (newReservation) => {
    try{
      await ReservationService.createReservation(newReservation);
      const token = localStorage.getItem("token");
      
      localStorage.clear();
      
      if(TokenService.decodeToken(token)){
        localStorage.setItem("token", token)
      }
      window.location.assign("/uspesno-placanje")
    }
    catch(error){
      StripeClient.refund(props.paymentIntentId)
      alert("Greska! " + error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
 
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      redirect: "if_required",
      elements,
      confirmParams: {
        //return_url: "http://localhost:3000/uspesno-placanje",
        receipt_email: email,
      },
    });
    
    if(!error){
      let serviceOffers = [];
      const playroomOfferId = localStorage.getItem("playroomOfferId");
      serviceOffers.push(playroomOfferId)
    
      const cateringOfferId = localStorage.getItem("cateringOfferId");

      if(cateringOfferId != null)
          serviceOffers.push(cateringOfferId);

      const animatorOfferId = localStorage.getItem("animatorOfferId")

      if(animatorOfferId != null)
          serviceOffers.push(animatorOfferId)

      const reservationRequestDTO = {
        dateOfReservation: localStorage.getItem("date"),
        startTime: localStorage.getItem("startTime"),
        endTime: localStorage.getItem("endTime"),
        numberOfKids: localStorage.getItem("numberOfKids"),
        numberOfAdults: localStorage.getItem("numberOfAdults"),
        additionalRequirements: props.additionalInformations.additionalRequest,
        ageOfKid: props.additionalInformations.ageOfKids,
        usersEmail: email,
        serviceOffers:serviceOffers
      }

 

      createReservation(reservationRequestDTO);
    }

    else{
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    }


  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <br/>
      <input
        id="email-input"
        className="email-label-stripe"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
      />
      <br/><br/>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now " + props.amount}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}