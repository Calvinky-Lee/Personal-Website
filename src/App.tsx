import React from 'react'
import { Projects } from './sections/Projects'
import { Experiences } from './sections/Experiences'
import { Skills } from './sections/Skills'
import { Certifications } from './sections/Certifications'
import { Hero } from './components/Hero'

export function App(): React.ReactElement {
  return (
    <>
      <header className="vc-header">
        <div className="vc-container">
          <a href="#" className="vc-logo">Calvin Lee</a>
          <nav className="vc-nav">
            <a href="#" className="vc-link is-active">Home</a>
            <a href="#projects" className="vc-link">Projects</a>
            <a href="#experiences" className="vc-link">Experience</a>
            <a href="#about" className="vc-link">About</a>
          </nav>
          <div className="vc-right">
            <a href="#contact" className="vc-btn vc-btn-primary">Contact</a>
            <a href="#resume" className="vc-btn vc-btn-ghost">Resume</a>
          </div>
        </div>
      </header>

      <div className="container">
        <main>
          <Hero />
          <Skills />
          <Experiences />
          <Certifications />
          <Projects />
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Calvin Lee. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}


