import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { Provider } from './store'

window.onload = function () {
  const el = document.createElement('div')
  document.body.appendChild(el)

  render(
    <Provider>
      <App />
    </Provider>,
    el
  )
}