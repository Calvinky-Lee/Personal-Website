import React from 'react'

type Experience = {
  company: string
  role: string
  period: string
  logo?: string
  banner?: string
}

const experiences: Experience[] = [
  {
    company: 'Thri5',
    role: 'Software Developer',
    period: 'July 2025 — August 2025 | 2 Months',
    banner: '',
    logo: '/images/thri5.jpeg',
  },
  {
    company: 'Computer Science',
    role: 'BCS',
    period: 'Expected Graduation 2030',
    banner: '',
    logo: '/images/download.png',
  },
]

export function Experiences(): React.ReactElement {
  return (
    <section id="experiences" className="experiences-slide-in" data-reveal>
      <h2>Experiences</h2>
      <div className="exp-grid stagger" data-parallax data-speed="0.1" data-sy="0.25" data-reveal>
        {experiences.map((e, idx) => (
          <article key={e.company} className="exp-card reveal-item" style={{ ['--i' as any]: idx }}>
            <div className="exp-banner" style={{ backgroundImage: e.banner ? `url(${e.banner})` : undefined }} />
            <div className="exp-body">
              <div className="exp-meta">
                <div className="exp-logo" style={{ backgroundImage: e.logo ? `url(${e.logo})` : undefined, backgroundSize: 'cover' }}>
                  {!e.logo && e.company.charAt(0)}
                </div>
                <div>
                  <p className="exp-title">{e.role} · {e.company}</p>
                  <p className="exp-role">{e.period}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


