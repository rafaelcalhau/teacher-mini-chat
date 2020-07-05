import React, { createContext, useReducer } from 'react'
// import auth from '@react-native-firebase/auth'
import ActionTypes from './types'

const initialState = {
  authenticationVerified: false,
  user: {}
}

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ActionTypes.AUTHENTICATED:
        return {
          ...state,
          user: action.user
        }
      case ActionTypes.AUTHENTICATION_VERIFIED:
        return {
          ...state,
          authenticationVerified: true
        }
      case ActionTypes.SIGN_OUT:
        return {
          ...state,
          user: {}
        }
      case ActionTypes.UPDATE_USER:
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload
          }
        }
      default:
        throw new Error()
    };
  }, initialState)

  // auth().signOut()

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
