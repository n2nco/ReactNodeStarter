import logo from './logo.svg';
import iclick from './ic-logo-original-size.jpg'
import './App.css';
import { StoreContext }  from './Store'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Web3Component from './Web3Component'  
import SignMessage from "./SignMessage";

import ToggleDays from './ToggleDays2'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

import SelectionContainer from './SelectionContainer';
import InputForm from './InputForm';
import { sizeHeight } from '@mui/system';

import Box from '@material-ui/core/Box';
import { CheckoutFormWrapped } from './CheckoutForm';


function App() {
  const [clicked, setClicked] = useState(false)
  const store = useContext(StoreContext)
  //new
  const [value, onChange] = useState(['10:00', '11:00']);
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
    <header className="App-header" style={{paddingTop: '60px', paddingBottom:'300px'}}>
    <a
          className="App-link"
          href="https://cdn.cdnparenting.com/articles/2021/10/08105732/2058809810.webp"
          target="_blank"
          rel="noopener noreferrer"
        >
          iClicked
        </a> 
        <img src={iclick} className="App-logo" alt="logo" />
        <Text/>
        <Box>
         <InputForm></InputForm>
         <CheckoutFormWrapped ></CheckoutFormWrapped>
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
      <Web3Component></Web3Component>
      <SignMessage></SignMessage>
    {/* </div> */}

    </>
  );

}

const Text = () => {
  return <code style={{marginBottom:'-100px', color: '#070c13', fontWeight: 300, letterSpacing: '0.025em', fontSize: '14px'}}>automate your iClicker participation</code>
}

export default App;
