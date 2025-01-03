import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./hooks/axios.jsx"
import axiosInstance from './hooks/axios.jsx'


onload = () => {
  axiosInstance.defaults.headers.common['Authorization'] = axiosInstance.defaults.headers.common['Authorization'] ;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
