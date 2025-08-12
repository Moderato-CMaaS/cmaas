import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from './components/toast-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer>
      <App />
    </ToastContainer>
  </StrictMode>,
)
