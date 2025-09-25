import React from 'react'

type WindowProps = {
  title?: string
  children: React.ReactNode
}

export function Window(props: WindowProps): React.ReactElement {
  const { title, children } = props
  return (
    <div className="window">
      <div className="titlebar">
        <div className="traffic-lights" aria-hidden>
          <span className="light red" />
          <span className="light yellow" />
          <span className="light green" />
        </div>
        {title && <div className="title">{title}</div>}
        <div />
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}


