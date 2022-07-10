import logo from './logo.svg';
import './App.css';
import { StoreContext }  from './Store'
import { useContext } from 'react'

function App() {
  const store = useContext(StoreContext)

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
        <p>storetest:</p>
        <p>{store?.state?.text}</p>
      
        {/* <p> sample store text: </p>{store.state.sampleText} */}
      </header>
    </div>
  );

}


const Text = () => {
  return <p>insightful content</p>
}

export default App;
