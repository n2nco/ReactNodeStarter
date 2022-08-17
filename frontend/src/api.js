
import axios from 'axios'
import store from './Store'

const qs = require('qs')
const assert = require('assert')


// export const getTest = () => {

//     if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
//         console.log('node env is: ' + process.env.NODE_ENV ?? null)
//         axios.get(`http://localhost:3010/test`)
//         .then(res => {
//         console.log("received api response: " + res.data)
//         store.dispatch({ type: 'setApiData', message: res.data})
//         // store.dispatch({ type: 'setWasDataReceived', message: true})
        
//         if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received:'); console.log(res.data)}
//         return true
//         })
//     }
// // }
//}

axios.defaults.headers.common = {
    "Content-Type": "application/json"
  }
export const writeNewSubmission = async () => {
    console.log('writing new submission')

    console.log('store.state:')
    console.log(store.state)

    const d = qs.stringify(store.state)
    console.log('qs d')
    console.log(d)

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
        console.log('node env is: ' + process.env.NODE_ENV ?? null)
        let res = await axios.post(`http://localhost:3010/testsubmission`, JSON.stringify({test: 'testy'}))
        console.log('req sent to server')
        console.log("received api response: " + res.data)
        // store.dispatch({ type: 'setApiData', message: res.data})
        // store.dispatch({ type: 'setWasDataReceived', message: true})
        
        if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received:'); console.log(res.data)}
        return true
        
    }
}