import React from 'react'

export function Hero(): React.ReactElement {
  return (
    <section className="hero" aria-label="Intro">
      <div className="macos-window slide-in-left">
        <div className="macos-titlebar">
          <div className="macos-traffic-lights">
            <div className="macos-light macos-red"></div>
            <div className="macos-light macos-yellow"></div>
            <div className="macos-light macos-green"></div>
          </div>
        </div>
        <div className="macos-content">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="display">I'm Calvin Lee</h1>
              <h2 className="subdisplay">And I study Computer Science @ <a href="https://cs.uwaterloo.ca/" target="_blank" rel="noreferrer" className="uwaterloo-link">UWaterloo</a></h2>
              <p className="subtitle">
                Hi! I'm Calvin Lee, a Computer Science student at UWaterloo and software engineer. Feel free to explore my website!
              </p>
              <div className="hero-ctas">
                <button 
                  className="button email-button" 
                  data-email="calvin.ky.lee@gmail.com"
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
                <a href="#resume" className="button button-ghost">Resume</a>
                <a href="https://www.instagram.com/calvin_ky_lee/" target="_blank" rel="noreferrer" className="social-button instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/calvin-lee-68ab0a20b" target="_blank" rel="noreferrer" className="social-button linkedin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src="/me.jpg" alt="Calvin Lee" className="profile-photo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


