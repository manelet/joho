const router = require('express').Router()
const Url = require('url')
const { getInteractivePage } = require('../lib/functions')

router.get('/', async (req, res, next) => {
  // Si no hi ha paràmetre url
  if (!req.query.url || req.query.url === '') {
    return next(new Error('URL query string es obligatori'))
  }

  // Parsejo URL
  const url = Url.parse(req.query.url)

  console.log('⚙️ Processing:', url.href)

  try {
    // Exrtrec contingut de la pagina i assets via puppeteer
    let {assets, content} = await getInteractivePage(url)

    // Injecto llibreria hovers
    content = content.replace(/<\/head>/, `<script src="http://localhost:4000/selector.js"></script></head>`)

    // Aquí si volem podem injectar una etiqueta <base> al <head> per tal de que totes les
    // requests relatives vagin al domini d'origen
    // Crec que al final no ho farem servir per res, ja que ens hem de descarregar els assets si o si
    // const base = content.match(/<base /gi)
    // if (!base) {
    //   content = content.replace(/<head>/, `<head><base href="${url.protocol}//${url.hostname}">`)
    // }

    // Per cada asset descarregat, modifico la crida dins de l'HTML perque faci servir l'arxiu nostre que
    // ens hem descarregat.
    Object.keys(assets).forEach(_url => {
      content = content.replace(_url, `/assets${assets[_url].split('.cache/')[1].replace(/-/gi, '/')}`)
      content = content.replace(_url.replace(`${url.protocol}//${url.hostname}`, ''), `/assets${assets[_url].split('.cache/')[1].replace(/-/gi, '/')}`)
    })

    // Torno contingut
    res.charset = 'utf8'
    res.setHeader('Content-Type', 'text/html')
    res.end(content)    
  } catch (err) {
    return next(err)
  }
})

router.get('*', )

module.exports = router