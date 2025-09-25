import React from 'react'

type Cert = { name: string; issuer: string; year?: string; link?: string }

const certs: Cert[] = [
  { name: 'Certification A', issuer: 'Organization', year: '2024', link: '#' },
  { name: 'Certification B', issuer: 'Provider', year: '2023', link: '#' },
]

export function Certifications(): React.ReactElement {
  return (
    <section id="certifications">
      <h2>Certifications</h2>
      <div className="grid">
        {certs.map((c) => (
          <article key={c.name} className="panel">
            <h3 style={{ marginTop: 0 }}>{c.name}</h3>
            <p style={{ marginTop: 0, color: 'var(--muted)' }}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</p>
            {c.link && (
              <p style={{ marginTop: 12 }}>
                <a href={c.link} target="_blank" rel="noreferrer" className="button">View</a>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}


