import React, { useReducer, createContext, useContext } from "react"

const Context = createContext()

const initialState = {
  url: ''
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_URL':
      return { ...state, url: action.url }
    default:
      return {...state}
  }
}

export function Provider ({ children }) {
  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Context.Provider>
  )
}

export function useStore () {
  const [state, dispatch] = useContext(Context)

  const actions = {
    updateUrl: url => dispatch({ type: 'UPDATE_URL', url })
  }

  return { ...state, ...actions }
}