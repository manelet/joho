import React, { memo, useCallback } from 'react'
import Trash from '../images/trash'
import { addStyles, removeStyles } from '../lib'

const LogInner = memo(({ extractions, onClick, onMouseLeave, onMouseEnter, onRemove, onSave}) => {
  return (
    <div className='crawler--log'>
      {extractions && extractions.length
        ? (
          <ul>
            {extractions.map(({ id, element, color, name }, index) => (
              <li
                key={id}
                onClick={onClick(element)}
                onMouseEnter={onMouseEnter({ element, color })}
                onMouseLeave={onMouseLeave(element)}
                style={{ cursor: 'pointer' }}
              >
                {name}
                <Trash width='16' height='16' onClick={onRemove({ element, index })} />
              </li>
            ))}
          </ul>          
        )
        : 'Click on elements to extract it\'s content'
      }

      <button onClick={onSave}>
        Save
      </button>
    </div>
  )
})

const Log = ({ extractions, removeExtraction, setActive }) => {
  const onSave = useCallback(e => {
    e.preventDefault()
    console.log(extractions)
  }, [extractions])

  const onClick = useCallback(el => () => {
    setActive(el)
  }, [setActive])

  const onMouseEnter = useCallback(({ element, color }) => e => {
    addStyles(element, color)
    e.target.style.backgroundColor = `rgba(${color}, .5)`
  }, [addStyles])

  const onMouseLeave = useCallback(el => e => {
    removeStyles(el)
    e.target.style.backgroundColor = `transparent`
  }, [removeStyles])

  const onRemove = useCallback(({ element, index }) => e => {
    e.stopPropagation()
    removeStyles(element)
    removeExtraction(index)
  }, [removeStyles, removeExtraction])

  return (
    <LogInner
      extractions={extractions}
      onClick={onClick}
      onRemove={onRemove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onSave={onSave}
    />
  )
}

export default Log