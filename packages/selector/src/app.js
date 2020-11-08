import React, { useLayoutEffect } from 'react'
import { addTextExtractionListeners } from './lib'
import { useStore } from './store'
import Selector from './selector'
import Log from './log'
import styles from './styles'

function addStyle(styleString) {
  const style = document.createElement('style')
  style.textContent = styleString;
  document.head.append(style)
}

export default function App () {
  const store = useStore()

  useLayoutEffect(() => {
     addStyle(styles)
     addTextExtractionListeners(store.actions.setActive)
  }, [])

  return (
    <>
      {!!store.state.active && (
        <Selector
          actions={store.actions}
          {...store.state}
        />
      )}
      <Log
        extractions={store.state.extractions}
        setActive={store.actions.setActive}
        removeExtraction={store.actions.removeExtraction}
      />
    </>
  )
}