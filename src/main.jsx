import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './CartSlice'
import App from './App.jsx'
import './index.css'
import store from './store'

// Ensure Redux DevTools are available in development
if (process.env.NODE_ENV === 'development') {
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render app with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
