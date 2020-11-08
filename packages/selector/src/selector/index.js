import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import Close from '../images/close'
import Radio from './radio'
import '../styles.js'

function color () {
  var o = Math.round, r = Math.random, s = 255;
  return `${o(r()*s)}, ${o(r()*s)}, ${o(r()*s)}`
}

function getXPathForElement(element) {
  const idx = (sib, name) => sib 
      ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
      : 1;
  const segs = elm => !elm || elm.nodeType !== 1 
      ? ['']
      : elm.id && document.getElementById(elm.id) === elm
          ? [`id("${elm.id}")`]
          : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
  return segs(element).join('/');
}

function getFormat (str) {
  if (!isNaN(str)) {
    return 'number'
  }

  if (new Date(str) !== "Invalid Date" && !isNaN(new Date(str))) {
    return 'date'
  }

  return 'text'
}

const SelectorInner = memo(forwardRef(
    ({
      isEdit,
      format,
      onCourtainClick,
      name,
      data,
      active,
      onRadioChange,
      onSave,
      removeActive
    }, ref) => (
      <div style={{ top: `${window.pageYOffset}px`}} className='crawler--modal' onClick={onCourtainClick}>
        <div className="crawler--modal-inner">
          <div>
            <small>
              <pre>
                {name}
              </pre>
            </small>
            <input
              type="text"
              name='name'
              ref={ref}
              placeholder='Name.  ..'
              defaultValue={data.name || ''}
            />

            <h3>Extracted content</h3>
            <textarea disabled value={format === 'html' ? active.innerHTML.trim() : active.innerText} />
              
            <h3>Format</h3>
            <ul>
              <li>
                <Radio name='format' value='text' onChange={onRadioChange} checked={format === 'text'} />
                <label htmlFor='text'>
                  Text
                </label>
              </li>
              <li>
                <Radio name='format' value='html' onChange={onRadioChange} checked={format === 'html'} />
                <label htmlFor='html'>
                  HTML
                </label>
              </li>              
              <li>
                <Radio name='format' value='number' onChange={onRadioChange} checked={format === 'number'} />
                <label htmlFor='number'>Number</label>
              </li>
              <li>
                <Radio name='format' value='date' onChange={onRadioChange} checked={format === 'date'} />
                <label htmlFor='date'>Date</label>
              </li>
              <li>
                <Radio name='format' value='currency' onChange={onRadioChange} checked={format === 'currency'} />
                <label htmlFor='currency'>Currency</label>
              </li>
            </ul>

            <hr />

            <button onClick={onSave}>
              {isEdit ? 'Edit' : 'Save'}
            </button>          
          </div>
        </div>
        <div className="crawler--modal-close" onClick={removeActive}>
          <Close />
        </div>
      </div>
    )
  )
)

export default function Selector ({ active, extractions, actions }) {
  const { removeActive, addExtraction, replaceExtraction } = actions
  const nameRef = useRef()
  const data = extractions.find(e => e.element === active) || {}
  const isEdit = Object.keys(data).length > 0
  const [format, setFormat] = useState(data.format || getFormat(active.innerText))
  const name = active.id
    ? `#${active.id}`
    : active.className && active.className.length
      ? '.' + active.className.split(' ').join(',')
      : active.tagName.toLowerCase()

  const onCourtainClick = e => {
    if (e.target === e.currentTarget && e.target.classList.contains('crawler--modal')) {
      removeActive()
    }
  }

  const onSave = useCallback(() => {
    const extraction = {
      id: `${new Date().getTime()}-${name}`,
      element: active,
      color: color(),
      name: nameRef.current.value,
      format,
      xPath: getXPathForElement(active),
      metadata: {
        id: active.id,
        class: active.className.split(' '),
        dataset: { ...active.dataset }
      }
    }

    if (!isEdit) {
      addExtraction(extraction)
    } else {
      replaceExtraction(extraction, extractions.findIndex(e => e.element === active))
    }
  }, [format, nameRef.current, isEdit, addExtraction, replaceExtraction, extractions, removeActive])

  const onRadioChange = useCallback(e => {
    setFormat(e.target.value)
  }, [setFormat])

  return (
    <SelectorInner
      ref={nameRef}
      format={format}
      active={active}
      name={name}
      data={data}
      isEdit={isEdit}
      onRadioChange={onRadioChange}
      onSave={onSave}
      onCourtainClick={onCourtainClick}
      removeActive={removeActive}
    />
  )
}