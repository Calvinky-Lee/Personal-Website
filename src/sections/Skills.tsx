import React from 'react'

const skills = [
  'Python', 'SQL', 'Javascript', 'React', 'Java', 'HTML', 'CSS', 'Node'
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


