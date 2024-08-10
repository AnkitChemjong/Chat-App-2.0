import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import './index.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster closeButton/>
  </>
 ,
)
