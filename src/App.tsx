import React, { useEffect, useState } from 'react'
import { Projects } from './sections/Projects'
import { Experiences } from './sections/Experiences'
import { Skills } from './sections/Skills'
import { Certifications } from './sections/Certifications'
import { Hero } from './components/Hero'

export function App(): React.ReactElement {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experiences', 'projects']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = section === 'home' 
          ? document.querySelector('.hero')
          : document.getElementById(section)
        
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="vc-header">
        <div className="vc-container">
          <a href="#" className="vc-logo">Calvin Lee</a>
          <nav className="vc-nav">
            <a href="#" className={`vc-link ${activeSection === 'home' ? 'is-active' : ''}`}>Home</a>
            <a href="#experiences" className={`vc-link ${activeSection === 'experiences' ? 'is-active' : ''}`}>Experience</a>
            <a href="#projects" className={`vc-link ${activeSection === 'projects' ? 'is-active' : ''}`}>Projects</a>
          </nav>
          <div className="vc-right">
            <button 
              className="vc-btn vc-btn-ghost email-button" 
              onClick={(e) => {
                navigator.clipboard.writeText('calvin.ky.lee@gmail.com');
                
                // Add click animation
                const button = e.currentTarget;
                button.classList.add('clicked');
                setTimeout(() => {
                  button.classList.remove('clicked');
                }, 300);
                
                // Show brief notification
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                  button.textContent = originalText;
                }, 1000);
              }}
            >
              Email
            </button>
            <a href="https://www.instagram.com/calvin_ky_lee/" target="_blank" rel="noreferrer" className="vc-btn vc-btn-ghost social-button instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/calvin-lee-68ab0a20b" target="_blank" rel="noreferrer" className="vc-btn vc-btn-ghost social-button linkedin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://github.com/Calvinky-Lee" target="_blank" rel="noreferrer" className="vc-btn vc-btn-ghost social-button github">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
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


