import React from 'react'

type Experience = {
  company: string
  role: string
  period: string
  bullets: string[]
  skills: string[]
  logo?: string
  banner?: string
}

const experiences: Experience[] = [
  {
    company: 'Company A',
    role: 'Software Engineer',
    period: '2022 — Present',
    skills: ['TypeScript','React','Node','GraphQL'],
    banner: '',
    logo: '',
    bullets: [
      'Built features across the stack with TypeScript and React.',
      'Improved performance and reduced bundle size by 30%.',
    ],
  },
  {
    company: 'Company B',
    role: 'Frontend Developer',
    period: '2020 — 2022',
    skills: ['React','Vite','CSS','REST'],
    banner: '',
    logo: '',
    bullets: [
      'Shipped design system components and accessibility fixes.',
      'Collaborated with backend to integrate REST/GraphQL APIs.',
    ],
  },
]

export function Experiences(): React.ReactElement {
  return (
    <section id="experiences" data-reveal>
      <h2>Experiences</h2>
      <div className="exp-grid" data-parallax data-speed="0.1" data-sy="0.25" data-reveal className="stagger">
        {experiences.map((e, idx) => (
          <article key={e.company} className="exp-card glow glow-soft reveal-item" style={{ ['--i' as any]: idx }}>
            <div className="exp-banner" style={{ backgroundImage: e.banner ? `url(${e.banner})` : undefined }} />
            <div className="exp-body">
              <div className="exp-meta">
                <div className="exp-logo" style={{ backgroundImage: e.logo ? `url(${e.logo})` : undefined, backgroundSize: 'cover' }} />
                <div>
                  <p className="exp-title">{e.role} · {e.company}</p>
                  <p className="exp-role">{e.period}</p>
                </div>
              </div>
              <div className="skills">
                {e.skills.map((s) => (
                  <span key={s} className="skill">{s}</span>
                ))}
              </div>
              <div className="exp-details">
                <ul>
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


