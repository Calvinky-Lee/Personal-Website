import React from 'react'

type Project = {
  title: string
  description: string
  link?: string
}

const projects: Project[] = [
  { title: 'Project One', description: 'A concise description of your first notable project.', link: '#' },
  { title: 'Project Two', description: 'What it does, tech used, and the impact it had.', link: '#' },
  { title: 'Project Three', description: 'Highlight results, performance or user outcomes.', link: '#' },
]

export function Projects(): React.ReactElement {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="grid">
        {projects.map((p) => (
          <article key={p.title} className="panel">
            <h3 style={{ marginTop: 0 }}>{p.title}</h3>
            <p>{p.description}</p>
            {p.link && (
              <p style={{ marginTop: 12 }}>
                <a href={p.link} target="_blank" rel="noreferrer" className="button">View</a>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}


