import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // ← スタイルの干渉を防ぐためコメントアウト
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
