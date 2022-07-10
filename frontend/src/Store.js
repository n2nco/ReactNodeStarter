import React, { useEffect, useContext, createContext } from 'react'
//used to *provide* the data+dispatch to components downstream

const defaultState = {

   sessionId: '',
   sortBy: false,
   wasDataReceived: true,
   text: 'sample text',
   
   mediaShown: 'tweets',
   medias: ['tweets', 'youtube', 'substack'],

}

//Usage in components: store.state.mediaShown
const reducer = (state, action) => {
   switch (action.type) {
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