import React from 'react'

const skills = [
  'Python', 'SQL', 'Javascript', 'React', 'Java', 'HTML', 'CSS', 'Node', 'Snowflake'
]

export function Skills(): React.ReactElement {
  return (
    <section id="skills" className="skills-slide-in">
      <h2>Skills</h2>
      <div className="panel chipset">
        {skills.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
    </section>
  )
}


