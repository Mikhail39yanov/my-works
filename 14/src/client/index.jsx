import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import { App } from '../App'

window.addEventListener('load', () => {
  ReactDOM.hydrate(
  // <BrowserRouter>
    <App />
  // </BrowserRouter>
  , document.getElementById('react-root'))
})