import BookingKidsPartiesClient from "./BookingKidsPartiesClient";

export const StripeClient = {
  createPayment,
  refund
};

async function createPayment(name, email, amount) {
  return await BookingKidsPartiesClient.post(`/payment/create`,{}, {
    headers: {
      amount: amount,
      username: name,
      email: email
    }
  });
}

async function refund(paymentIntentId) {
  return await BookingKidsPartiesClient.post(`/payment/refund`,{}, {
    headers: {
      clientSecret: paymentIntentId
    }
  });
}