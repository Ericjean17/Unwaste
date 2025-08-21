import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // Strict mode is for development, alerts appear twice
  <StrictMode>
    <App /> 
  </StrictMode>
)
