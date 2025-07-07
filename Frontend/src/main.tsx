import { StrictMode } from 'react'
import { TaskProvider } from './contexts/Task Context/TaskContext.tsx'
import { AuthProvider } from './contexts/Auth Context/AuthContext.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>,
)
