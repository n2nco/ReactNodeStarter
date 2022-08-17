
import axios from 'axios'
import store from './Store'
import { toast } from "react-toastify";

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



export const saveStripeToken = async (token) => {
    try {
        console.log('stripe token in ./api.js: ' + token)
        console.log('store.state:')
        console.log(store.state)

        const d = qs.stringify(store.state)
        console.log('qs d')
        console.log(d)

        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
            console.log('node env is: ' + process.env.NODE_ENV ?? null)
            console.log('posting to 3010')

            let res = await axios.post(`http://localhost:3010/saveStripeToken`, JSON.stringify(token))
            console.log('res.data:')
            console.log(res.data)
            if (res.data === "success") {
                console.log('inside success - running toast success')

                return true // will trigger toast success
            } else {
                console.log('error')
                toast("Something went wrong", { type: "error" });
                return false //toast error
            }


        }
    } catch (e) {
        console.log('error in savestripetoken')
        console.log(e)
    }
}
export const writeNewOrder = async (paymentIntent) => {
    console.log('writing new order')

    console.log('store.state:')
    console.log(store.state)

    const d = qs.stringify(store.state)
    console.log('qs d')
    console.log(d)

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
        console.log('node env is: ' + process.env.NODE_ENV ?? null)
        let res = await axios.post(`http://localhost:3010/newOrder`, JSON.stringify({ test: 'testy' }))
        console.log('req sent to server')
        console.log("received api response: " + res.data)
        // store.dispatch({ type: 'setApiData', message: res.data})
        // store.dispatch({ type: 'setWasDataReceived', message: true})

        if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received:'); console.log(res.data) }
        return true

    }
}