import logo from './logo.svg';
import iclick from './iclickedImage.png'
import './App.css';
import { StoreContext }  from './Store'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Web3Component from './Web3Component'  
import SignMessage from "./SignMessage";

import ToggleDays from './ToggleDays2'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

import SelectionContainer from './SelectionContainer';

// import InputForm from './InputForm';
import { default  as InputForm } from './InputForm2';
import { sizeHeight } from '@mui/system';

import Box from '@material-ui/core/Box';
import CheckoutForm  from './CheckoutForm';
//import CheckoutForm2  from './CheckoutForm2';

// import StripeApp from './StripeApp';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//modal


function App() {
  const [clicked, setClicked] = useState(false)
  const store = useContext(StoreContext)
  //new
  const [value, onChange] = useState(['10:00', '11:00']);

  let navigate = useNavigate() // for redirecting to homepage if successful payment detected


  //AUG 17th - bringing code in from from stripe-sample-code
  const stripePromise = loadStripe("pk_test_51LTvVADpGantSZj85XqAIo1e8fTMan7oYX90iettjwre22Vsy8PuuSMd8nRveBKlxMFMuwoa2avEAsgPcEivHCP400Cr9bHAND");
  // const [clientSecret, setClientSecret] = useState(""); 

  useEffect(async () => {
    try{
      let url = window.location.pathname.split('/').pop();
      if (url.includes('success')) {

        let s = localStorage.getItem('state')
        s = JSON.parse(s)
        console.log('found existing state')
        console.log(s)
        if (s) {
          toast.success(`🦄  Success!  I've emailed your receipt to ${s.email}. Enjoy your perfect ${s.courseCode} attendance! Use ${s.email} when checking out on any other courses & we'll send your email 20% of all orders placed using it.`, {
          position:  "top-center",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
        //clean up
        localStorage.removeItem('state')
        //redirect to home
        setTimeout(() => navigate('/'), 4000)
        console.log('store.state')
        console.log(store.state)



      }
    
    }
    catch(e){
      console.log('error checking local storage in app.js')
      console.log(e)
    }

    // Create PaymentIntent as soon as the page loads - why?

    // let res = await axios.post('http://localhost:3010/create-payment-intent', store.state)
    // console.log('/create-payment-intent response:')
    // console.log(res)
    // setClientSecret(res.data.clientSecret)
    // console.log('clientSecret:')


      // .then((res) => {console.log(res); console.log('res^');} )
      // .then((data) => {
      //   console.log('data, including clientSecret:')
      //   setClientSecret(data.clientSecret)
      // } )
    
      // console.log(clientSecret)
  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorText: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    },
  };
  const options = {
    clientSecret: store?.state?.clientSecret,
    appearance,
  };


  //Uncomment for api call later - Aug 6th
//   useEffect(() => {
//     console.log("running useEffect. node_env: " + process.env.NODE_ENV)
//     // if (!store.state.wasDataReceived) {
//       if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
//         console.log('node env is: ' + process.env.NODE_ENV ?? null)
//         axios.get(`http://localhost:3010/test`)
//         .then(res => {
//           console.log("received api response: " + res.data)
//           store.dispatch({ type: 'setApiData', message: res.data})
//           store.dispatch({ type: 'setWasDataReceived', message: true})
          
//           if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received:'); console.log(res.data)}
//           return true
//         })
//       }
//     // }
//  }, [])//runs only on 1st render w empty array, (then every time store.state.wasDataReceived changes?)

  return (

    <>  
   
    {/* <div className="App"> */}
    <header className="App-header" style={{paddingTop: '60px', paddingBottom:'0px'}}>
        <a
          className="App-link"
          // href="https://cdn.cdnparenting.com/articles/2021/10/08105732/2058809810.webp"
          target="_blank"
          rel="noopener noreferrer"
        >
         
        </a> 
        <img src={iclick} className="App-logo" alt="logo"  />
        <Text />
        <ToastContainer positionClass={'toast-top-full-width'} containerId={'success'} position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div style={{marginBottom: '-60px'}} ></div>
        <Box>
         <InputForm></InputForm>
        
         { (store?.state?.clientSecret && !store?.state?.orderModifiedWithoutResubmit) && (
          <Elements options={{clientSecret: store.state.clientSecret, appearance}} stripe={stripePromise}>
          <CheckoutForm ></CheckoutForm>
          </Elements>
          ) } 
      
         {/* <SelectionContainer></SelectionContainer> */}
         </Box>
 
{/*     
      {(store?.state?.wasDataReceived) ? (
      <code> data received</code>
       ) : ( <code>data not received </code> )}

        <button onClick={() => setClicked(!clicked)}> toggle clicked: {String(clicked)} </button>
        <button onClick={() => { store.dispatch({type: 'setWasDataReceived', message: !store?.state.wasDataReceived})}}> toggle store.state.wasDataReceived: {String(store?.state.wasDataReceived)} </button>
        <p>store test:  {store?.state?.text}</p>
        <p>store test - update after api req:  {store?.state?.apiData}</p> */}
      </header>
      <label style={{fontWeight:'Normal', lineHeight: 3,  display: "block",
          textAlign: "center", 
          lineHeight: "150%", 
          paddingTop: '30px',
          fontSize: ".85em"}}> 🦄 iClickerContact@gmail.com - 2022</label>
      {/* <Web3Component></Web3Component>
      <SignMessage></SignMessage> */}
    {/* </div> */}

    </>
  );

}

const Text = () => {
  return <label style={{marginBottom:'-100px', color: '#070c13', fontWeight: 300, letterSpacing: '0.025em', fontSize: '10px'}}>iClicker participation automated</label>
}

export default App;
