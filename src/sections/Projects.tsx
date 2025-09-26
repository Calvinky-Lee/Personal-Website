import React from 'react'

type Project = {
  title: string
  description: string
  link?: string
  tags?: string[]
}

const projects: Project[] = [
  { title: 'Project One', description: 'A concise description of your first notable project.', link: '#', tags: ['TypeScript','React'] },
  { title: 'Project Two', description: 'What it does, tech used, and the impact it had.', link: '#', tags: ['GraphQL','Node'] },
  { title: 'Project Three', description: 'Highlight results, performance or user outcomes.', link: '#', tags: ['Vite','CSS'] },
]

export function Projects(): React.ReactElement {
  return (
    <section id="projects" data-reveal>
      <h2>Projects</h2>
      <div className="grid" data-parallax data-speed="0.08" data-sy="0.3" data-reveal className="stagger">
        {projects.map((p, idx) => (
          <article key={p.title} className="card glow glow-soft reveal-item" style={{ ['--i' as any]: idx }}>
            <div className="card-body">
              <h3 className="card-title">{p.title}</h3>
              <p className="card-sub">{p.description}</p>
              {p.tags && (
                <div className="tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              )}
              {p.link && (
                <p style={{ marginTop: 12 }}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="button">View</a>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


