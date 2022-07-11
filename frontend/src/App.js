import logo from './logo.svg';
import './App.css';
import { StoreContext }  from './Store'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [clicked, setClicked] = useState(false)

  const store = useContext(StoreContext)

  useEffect(() => {
    console.log("running useEffect. node_env: " + process.env.NODE_ENV)
    if (!store.state.wasDataReceived) {
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
        console.log('node env is: ' + process.env.NODE_ENV ?? null)
        axios.get(`http://localhost:4000/data`)
        .then(res => {
          console.log("received api response: " + res.data)
          store.dispatch({ type: 'setApiData', message: res.data})
          store.dispatch({ type: 'setWasDataReceived', message: true})
          
          if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received:'); console.log(res.data)}
          return true
        })
      }
    }
 }, [])//runs only on 1st render w empty array, (then every time store.state.wasDataReceived changes?)

  return (
    <div className="App">

      {(store?.state?.wasDataReceived) ? (
      <p> data received</p>
       ) : ( <p>data not received </p> )}

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
        <Text/>
        <button onClick={() => setClicked(!clicked)}> toggle clicked: {String(clicked)} </button>
        <button onClick={() => { store.dispatch({type: 'setWasDataReceived', message: !store.state.wasDataReceived})}}> toggle store.state.wasDataReceived: {String(store.state.wasDataReceived)} </button>
        <p>store test:  {store?.state?.text}</p>
        <p>store test - update after api req:  {store?.state?.apiData}</p>
      </header>
    </div>
  );

}


const Text = () => {
  return <p>insightful content</p>
}

export default App;
