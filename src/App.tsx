import React from 'react'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Projects } from './sections/Projects'
import { Experiences } from './sections/Experiences'
import { Skills } from './sections/Skills'
import { Certifications } from './sections/Certifications'
import { Window } from './components/Window'

export function App(): React.ReactElement {
  return (
    <div className="container">
      <header className="header">
        <nav className="nav" style={{ width: '100%', justifyContent: 'space-between' }}>
          <a href="#about" className="logo" style={{ fontWeight: 700 }}>Calvin Lee</a>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <a href="#projects">Projects</a>
            <a href="#experiences">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#certifications">Certs</a>
            <a href="#contact" className="button">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <Window title="portfolio">
          <About />
          <Projects />
          <Experiences />
          <Skills />
          <Certifications />
          <Contact />
        </Window>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Calvin Lee. All rights reserved.</p>
      </footer>
    </div>
  )
}


