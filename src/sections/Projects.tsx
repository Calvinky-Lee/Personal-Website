import React, { useState, useEffect } from 'react'

type Project = {
  title: string
  description: string
  link?: string
  tags?: string[]
  image?: string
}

const projects: Project[] = [
  { title: 'UW-2DO', description: 'An All in one tasks organiser and chatbot availible tailored for UWaterloo students', link: 'https://github.com/zach3141592/UW-2Do', tags: ['JavaScript','React','HTML','CSS','Node'] },
  { title: 'Personal Website!', description: 'my own personal website', link: 'https://calvin-lee.ca', tags: ['React','JavaScript','HTML','CSS'], image: '/images/personalwebsite.png' },
]

export function Projects(): React.ReactElement {
  const [modalImage, setModalImage] = useState<string | null>(null)

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc)
  }

  const closeModal = () => {
    setModalImage(null)
  }

  // Lock body scroll when modal is open and reset scroll position
  useEffect(() => {
    if (modalImage) {
      // Store current scroll position
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.overflow = 'unset'
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [modalImage])

  return (
    <section id="projects" data-reveal>
      <h2>Projects</h2>
      <div className="grid stagger" data-parallax data-speed="0.08" data-sy="0.3" data-reveal>
        {projects.map((p, idx) => (
          <article key={p.title} className="card glow glow-soft reveal-item" style={{ ['--i' as any]: idx }}>
            <div className="card-body" style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-sub">{p.description}</p>
                {p.tags && (
                  <div className="tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
                {p.link && (
                  <p style={{ marginTop: 24 }}>
                    <a href={p.link} target="_blank" rel="noreferrer" className="button">View</a>
                  </p>
                )}
              </div>
              {p.image && (
                <div className="project-image" style={{ flex: '0 0 auto', alignSelf: 'flex-start' }}>
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    style={{ width: '320px', height: 'auto', border: '2px solid white', borderRadius: '8px' }} 
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      
      {/* Modal for fullscreen image */}
      {modalImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            cursor: 'pointer'
          }}
          onClick={closeModal}
        >
          <img 
            src={modalImage} 
            alt="Fullscreen view" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain',
              pointerEvents: 'none'
            }}
          />
        </div>
      )}
    </section>
  )
}


