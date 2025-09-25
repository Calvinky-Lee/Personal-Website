import React from 'react'

type Experience = {
  company: string
  role: string
  period: string
  bullets: string[]
}

const experiences: Experience[] = [
  {
    company: 'Company A',
    role: 'Software Engineer',
    period: '2022 — Present',
    bullets: [
      'Built features across the stack with TypeScript and React.',
      'Improved performance and reduced bundle size by 30%.',
    ],
  },
  {
    company: 'Company B',
    role: 'Frontend Developer',
    period: '2020 — 2022',
    bullets: [
      'Shipped design system components and accessibility fixes.',
      'Collaborated with backend to integrate REST/GraphQL APIs.',
    ],
  },
]

export function Experiences(): React.ReactElement {
  return (
    <section id="experiences">
      <h2>Experiences</h2>
      <div className="grid">
        {experiences.map((e) => (
          <article key={e.company} className="panel">
            <h3 style={{ marginTop: 0 }}>{e.role} · {e.company}</h3>
            <p style={{ marginTop: 0, color: 'var(--muted)' }}>{e.period}</p>
            <ul>
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}


