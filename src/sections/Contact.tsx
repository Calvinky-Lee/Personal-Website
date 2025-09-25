import React from 'react'

export function Contact(): React.ReactElement {
  return (
    <section id="contact">
      <div className="panel">
        <h2>Contact</h2>
        <p>Feel free to reach out for collaboration or opportunities.</p>
        <form className="grid" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Name" required style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <input type="email" placeholder="Email" required style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
          <textarea placeholder="Message" rows={5} required style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', gridColumn: '1 / -1' }} />
          <div>
            <button className="button" type="submit">Send</button>
          </div>
        </form>
        <p style={{ marginTop: 12, color: 'var(--muted)' }}>Or email me at <a href="mailto:you@example.com">you@example.com</a></p>
      </div>
    </section>
  )
}


