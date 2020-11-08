import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './app.css'

import { Provider } from './state'
import App from './app'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
