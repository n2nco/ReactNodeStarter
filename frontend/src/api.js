
import axios from 'axios'
import store from './Store'
import { toast } from "react-toastify";

// const dotenv = require('dotenv')
// dotenv.config()


// import dotenv from 'dotenv'
// dotenv.config()


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


axios.defaults.headers.common = {
    "Content-Type": "application/json"
}


export const sumbitStripePayment = (token) => {
    try {


    } catch (error) {
    }

}

export const createPaymentIntent = async (values, storeState) => {
    try {
        //combine latest form values with store.state!
        let storeStateWformValues = Object.assign(storeState, values)
        console.log('process.env.REACT_APP_API_URL_PRODUCTION' + process.env.REACT_APP_API_URL_PRODUCTION)

        let apiUrl
        process.env.REACT_APP_ENV === 'development' ? apiUrl = process.env.REACT_APP_API_URL_DEVELOPMENT : apiUrl = process.env.REACT_APP_API_URL_PRODUCTION

        let res = await axios.post(`${apiUrl}/create-payment-intent`, storeStateWformValues)
        // .then((res) => {console.log(res); console.log('res^');} )
        // .then((data) => {
        //   console.log('data, including clientSecret:')
        //   setClientSecret(data.clientSecret)
        // } )
        console.log('/create-payment-intent response: - is the payment intent obj here?')
        console.log(res)
        console.log('res data:')
        return res
    } catch (error) {
        console.log('error in createPaymentIntent - api.js:')
        window.e = error
        console.log(error)
        setTimeout( () => alert('/create-payment-intent error - server may be offline ' + JSON.stringify(window.e), 2000))
        return false
    }
}

//passing in store state from react component b/c usecontext only works in component
export const writeNewOrder = async (paymentIntent, storeState) => {
    console.log('writing new order')

    console.log('store.state:')
    console.log(storeState)

    const d = qs.stringify(storeState) //do i need to crate a function that returns store to get valid/loaded/updated store object?
    console.log('qs d')
    console.log(d)

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
        console.log('node env is: ' + process.env.NODE_ENV ?? null)
        let res = await axios.post(`http://localhost:3010/newOrder`, storeState, paymentIntent)
        console.log('req sent to server')
        console.log("received api response: " + res.data)
        // store.dispatch({ type: 'setApiData', message: res.data})
        // store.dispatch({ type: 'setWasDataReceived', message: true})

        if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received from /newOrder response:'); console.log(res.data) }
        return true

    }

}


// export const saveStripeToken = async (token) => {
//     try {
//         console.log('stripe token in ./api.js: ' + token)
//         console.log('store.state:')
//         console.log(store.state)

//         const d = qs.stringify(store.state)
//         console.log('qs d')
//         console.log(d)

//         if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
//             console.log('node env is: ' + process.env.NODE_ENV ?? null)
//             console.log('posting to 3010')

//             let res = await axios.post(`http://localhost:3010/saveStripeToken`, JSON.stringify(token))
//             console.log('res.data:')
//             console.log(res.data)
//             if (res.data === "success") {
//                 console.log('inside success - running toast success')

//                 return true // will trigger toast success
//             } else {
//                 console.log('error')
//                 toast("Something went wrong", { type: "error" });
//                 return false //toast error
//             }


//         }
//     } catch (e) {
//         console.log('error in savestripetoken')
//         console.log(e)
//     }
// }
