import React, { createContext, useReducer } from 'react'
import ActionTypes from './types'

const initialState = {
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
      case ActionTypes.SIGN_OUT:
        return {
          ...state,
          user: {}
        }
      default:
        throw new Error()
    };
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
