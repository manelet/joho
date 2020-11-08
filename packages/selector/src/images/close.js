import React from 'react'

export default function ({ stroke = '#fff', ...props }) {
  return (
    <svg viewBox="0 0 32 32" {...props}>
      <g id="cross" stroke={stroke}>
        <line className="cls-1" x1="7" x2="25" y1="7" y2="25"/>
        <line className="cls-1" x1="7" x2="25" y1="25" y2="7"/>
      </g>
    </svg>
  )
}