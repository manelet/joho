import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { useStore } from './state'
import Panel from './panel'

function Select () {
  const { url, updateUrl } = useStore()
  const [loading, toggleLoading] = useState(true)
  const [log, updateLog] = useState([])
  const iframe = useRef(null)
  const onLoad = e => toggleLoading(false)

  useEffect(() => {
    if (!loading) {
      console.log('LOADED!');
      iframe.current.style.display = 'block'
    }
  }, [loading])

  useEffect(() => {
    window.onmessage = function (e) {
      if (e.data.name && e.data.name.includes('crawler-')) {
        console.log('🎉 REBO MISSATGE DE LALTRE SCRIPT!', e.data)
        updateLog([...log, e.data])
      }
    }
  }, [log])

  // useEffect(() => {
  //   updateUrl('https://www.directoalpaladar.com/curso-de-cocina/17-recetas-cocina-japonesa-para-principiantes')
  //   // eslint-disable-next-line
  // }, [])

  if (!url) {
    return 'URL es obligatoria'
  }

  const apiUrl = `http://localhost:4000/?url=${encodeURIComponent(url)}`

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <nav>
        <Link to='/'>
          <span role='img' aria-label='logo'>
            le crawler 🎉
          </span>
        </Link>
        <div>
          {url}
        </div>
      </nav>
      {/* <div className="log">
        {log.length
          ? log.map((l, i) => (
              <p key={`log-${i}`} style={{ marginBottom: '10px' }}>
                {JSON.stringify(l)}
              </p>
            ))
          : 'Cap interaccio'
        }
      </div> */}
      <div className="iframe">
        {loading && (
          <div className='loading'>
            loading...
          </div>
        )}
        <iframe
          onLoad={onLoad}
          ref={iframe}
          title={url}
          src={apiUrl}
          style={{ width: '100vw', height: '100vh', display: 'none' }}
        />
      </div>
    </div>
  )
}

function App() {
  const [url, setUrl] = useState(null)

  return (
    <Router>
      <Route path='/' exact>
        <Panel url={url} setUrl={setUrl} />
      </Route>
      <Route path='/define/'>
        <Select url={url} setUrl={setUrl} />
      </Route>
    </Router>
  )
}

export default App;
