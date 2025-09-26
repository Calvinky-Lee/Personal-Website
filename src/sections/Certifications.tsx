import React from 'react'

type Cert = { name: string; issuer: string; year?: string; link?: string; image?: string }

const certs: Cert[] = [
  { name: 'Master Modern SQL with Snowflake', issuer: 'Udemy', year: '2025', link: 'https://www.google.com/url?sa=D&q=https://www.udemy.com/certificate/UC-38e57053-c2d1-4a89-9d9c-fa996c070005/&ust=1758931020000000&usg=AOvVaw0gSpsdJkT56ps2x0vnOuyr&hl=en-GB', image: '/images/snowflake.png' },
  { name: 'The Complete Full-Stack Web Development Bootcamp', issuer: 'Udemy', year: '2024', link: 'https://www.udemy.com/certificate/UC-73323ebb-c0e1-4e73-b73f-2274f1cc2924/', image: '/images/fullstack.png' },
]

export function Certifications(): React.ReactElement {
  return (
    <section id="certifications" className="certifications-slide-in">
      <h2>Certifications</h2>
        <div className="cert-grid">
          {certs.map((c, idx) => (
            <article key={c.name} className="panel cert-card" style={{ ['--i' as any]: idx }}>
              <div className="cert-content">
                <div className="cert-text">
                  <h3 style={{ marginTop: 0 }}>{c.name}</h3>
                  <p style={{ marginTop: 0, color: 'var(--muted)' }}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</p>
                </div>
                {c.image && (
                  <div className="cert-image">
                    <img src={c.image} alt={c.name} />
                  </div>
                )}
              </div>
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


