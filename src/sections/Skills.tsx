import React from 'react'

const skills = [
  'TypeScript', 'React', 'Node.js', 'Vite', 'CSS', 'GraphQL', 'REST', 'Testing'
]

export function Skills(): React.ReactElement {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="panel chipset">
        {skills.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
    </section>
  )
}


