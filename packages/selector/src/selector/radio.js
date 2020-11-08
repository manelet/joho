import React, { memo } from 'react'

const Radio = memo(({ name, value, checked, onChange }) => {
  return (
    <input
      onChange={onChange}
      checked={checked}
      type="radio"
      name={name}
      value={value}
      id={value}
    />
  )
})

export default Radio