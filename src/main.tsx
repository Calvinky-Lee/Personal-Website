import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles.css'
import { useParallax } from './components/Parallax'
import { SpaceBackground } from './components/Space'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <SpaceBackground />
      <App />
    </ParallaxProvider>
  </React.StrictMode>,
)

function ParallaxProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  useParallax()
  return <>{children}</>
}


