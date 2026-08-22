import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// wait for the webfont so we paint once instead of flashing the
// fallback font and swapping; 300ms cap so a slow font never blocks the page
Promise.race([
  document.fonts.load('600 16px "Geist Variable"'),
  new Promise((resolve) => setTimeout(resolve, 300)),
]).finally(render)
