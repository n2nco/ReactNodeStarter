import React, { useEffect, useContext, createContext } from 'react'
//used to *provide* the data+dispatch to components downstream

const defaultState = {


   courseCode: "",
   courseCodeDefault: "CPSC100",
   term: "",

   daysAndTimes: { 
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    },

   sessionId: '',
   sortBy: false,
   wasDataReceived: false,
   text: 'sample text',
   apiData: false,
   
   mediaShown: 'tweets',
   medias: ['tweets', 'youtube', 'substack'],

   submitted: false,

}

//Usage in components: store.state.mediaShown
const reducer = (state, action) => {
    console.log('running action ' + action.type + ' with payload: ' + action.message)

   switch (action.type) {
      case 'setDaysAndTimes':
         console.log('setting days and times' + action.message) 
         return { 
            ...state, weekdaysSelected: action.message 
         }
      
      case 'newSubmission':
         console.log('new submission in store l44')
         return {
            ...state, submitted: true,
         }



      case 'setMediaShown':
         return {
           ...state,
           mediaShown: action.message, 
       }
       case 'setSortBy':
         return {
           ...state,
           sortBy: action.message,
        }
        case 'setApiData':
            return {
              ...state,
              apiData: action.message,
           }
         case 'setWasDataReceived':
         return {
            ...state,
            wasDataReceived: action.message,
         }
    }
}


const initState = (initialState) => {
   return defaultState
}

let storeConfigProp = null
const StoreProvider = ({ storeConfig, children }) => {
   const [state, dispatch] = React.useReducer(reducer, defaultState, initState) 
   return (
      <StoreContext.Provider value={{ state, dispatch }}>
         {children}
      </StoreContext.Provider>
   )
}
export const StoreContext = createContext() 
export default StoreProvider