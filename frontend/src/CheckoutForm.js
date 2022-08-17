import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import StripeCheckout from "react-stripe-checkout";

import Box from '@material-ui/core/Box';
import './stylesStripe.css'

import axios from 'axios';
import { toast } from "react-toastify";
import { StoreContext } from "./Store";

const CheckoutForm = () => {
  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (elements == null) {
  //     return;
  //   }

  //   const {error, paymentMethod} = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card: elements.getElement(CardElement),
  //   });
  // };

  var store = useContext(StoreContext)

  const [productSelected] = React.useState({
    name: "1 fall semester course",
    price: 49.67,
    description: "1 fall semester course",
  });


  async function handleToken(token, addresses) {
    let s = store.state
    const response = await axios.post(
      "localhost:3010/newsubmission",
      { token, productSelected, s }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (

    <Box 
    // display={'inline-flex'}
    maxWidth={300}
    margin='auto'
    alignItems="center"
    justifyContent="center"
    marginTop={-25}>

    {/* <form onSubmit={handleSubmit} style={{ marginBottom: '100px'}} > */}
    <StripeCheckout
      style={{ display: 'table', margin: '0 auto'}}
      stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
      token={handleToken}
      currency="CAD"
      bitcoin={true}
      amount={4900}
      name='1 course'>
    </StripeCheckout>

      {/* <CardElement />
      <button  type="submit" style={{ display: 'table', margin: '0 auto'}} disabled={!stripe || !elements}>
        Pay
      </button> */}
    {/* </form> */}
    </Box>
  );
};

const stripePromise = loadStripe('pk_test_51LTvVADpGantSZj85XqAIo1e8fTMan7oYX90iettjwre22Vsy8PuuSMd8nRveBKlxMFMuwoa2avEAsgPcEivHCP400Cr9bHAND');

export const CheckoutFormWrapped = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);


// import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

// export const CheckoutFormWrapped = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: "https://example.com/order/123/complete",
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button disabled={!stripe}>Submit</button>
//     </form>
//   )
// };