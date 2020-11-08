import React, { createContext, useReducer, useContext, useMemo } from 'react'
import initialState from './initial'
import reducer from './reducer'
import { createActions } from './actions'

const Context = createContext(initialState)

export function Provider ({ children }) {
  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Context.Provider>
  )
}

export function useStore (f) {
  const [state, dispatch] = useContext(Context)
  const actions = useMemo(() => createActions(dispatch), [dispatch])
  return f && typeof f === 'function' ? f({state, actions}) : { state, actions }
}