import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import StripeCheckout from "react-stripe-checkout";

import Box from '@material-ui/core/Box';
import './stylesStripe.css'

import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { StoreContext } from "./Store";
import { saveStripeToken, writeNewOrder } from './api';

import './StripePayment.css'






const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [toastSuccess, setToastSuccess] = React.useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log('clientSecret from url - use to simulate new url? ! ')
    console.log(clientSecret)

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          //Can add state to database here???????????????????
          writeNewOrder(paymentIntent);

          console.log('paymentIntent.status - succeeded')
          setMessage("Payment succeeded!");
          setToastSuccess(false)
            toast.success(`🦄  Nice job! -> ${message}  {'\n'}  - pick another course or check your email for receipt`, {
              position: "top-right",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
  const handleSubmit = async (e) => {
    //set store.state to localstorage here? - that way can show in modal on next page?

    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
    });
    console.log('confirm payment Reult:')
    console.log(result)
    let {error} = result


    //show any/al errors in toast error
    if (result.error) {
      setToastSuccess(false)
      toast.error(`🦄 Error! -> ${JSON.stringify(result.error, 4)}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };










  var store = useContext(StoreContext)

  const [productSelected] = React.useState({
    name: "1 fall semester course",
    price: 49.67,
    description: "1 fall semester course",
  });
  // const [toastSuccess, setToastSuccess] = React.useState(null);


  async function handleToken(token) {
    console.log("running handleToken - token: ")
    console.log(token)

    let stripeSuccess = await saveStripeToken(token)

    if (stripeSuccess) {
      setToastSuccess(true)
      toast('🦄 Wow so easy! We just sent you an email', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
    if (!stripeSuccess) {
      setToastSuccess(false)
      toast.error('🦄 Error! Try again or contact us by email', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }

    // let s = store.state
    // const response = await axios.post(
    //   'localhost:3010/savestripetoken',
    //   { token, productSelected }
    // );
    // const { status } = response.data;
    // console.log("Response:", response.data);
    // if (status === "success") {
    //   toast("Success! Check email for details", { type: "success" });
    // } else {
    //   toast("Something went wrong", { type: "error" });
    // }
  }

  return (
    <>
      { toastSuccess && <ToastContainer containerId={'success'} position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> }
      
      { !toastSuccess && <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> }
      

      <Box maxWidth={300} margin='auto' alignItems="center" justifyContent="center" marginTop={-25}>
    

    
        {/* <form onSubmit={handleSubmit} style={{ marginBottom: '100px'}} > */}
        <StripeCheckout style={{ display: 'table', margin: '0 auto' }} stripeKey="pk_test_51LTvVADpGantSZj85XqAIo1e8fTMan7oYX90iettjwre22Vsy8PuuSMd8nRveBKlxMFMuwoa2avEAsgPcEivHCP400Cr9bHAND" token={handleToken} currency="CAD" bitcoin={true} amount={4900} name='1 fall semester (1) course' description='CPSC 100' label='Submit & Pay' >
        </StripeCheckout>

      {/* aug 17th migrating from old to new stripe test: - -https://stripe.com/docs/stripe-js/react*/}
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element"></PaymentElement>
        <button disabled={!stripe} id="submit">Submit</button> 
        {message && <div id="payment-message">{message}</div>}
        </form>

        {/* <CardElement />
      <button  type="submit" style={{ display: 'table', margin: '0 auto'}} disabled={!stripe || !elements}>
        Pay
      </button> */}
        {/* </form> */}
      </Box>
    </>
  );
};

// export const CheckoutFormWrapped = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );


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

export default CheckoutForm;