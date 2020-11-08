const fs = require('fs')
const path = require('path')
const { getExtension } = require('../../lib/functions')

// ContentType per cada tipus de asset que descarregem per despres servir nosaltres mateixos.
// Això s'ha d'acabar de completar: fonts, imatges(??), manifest.json etc...
const ContentTypes = {
  css: 'text/css',
  js: 'application/x-javascript;charset=utf-8',
  woff2: 'font/woff2',
  woff: 'font/woff',
  ttf: 'text/html;charset=utf-8',
  json: 'application/json'
}

module.exports = function (req, res) {
  // Extrec extensió del asset
  // Aquesta funcio no es gaire fiable i s'hauria de millorar.
  const ext = getExtension(req.url)

  // Construeixo nopm de l'asset i canvio totes les / per - per poder guardar l'arxiu
  const filename = req.url.replace('/assets', '').replace(/\//gi, '-')

  // Construeixo path amb el filename per guardar-ho a .cache (de moment)
  const filepath = path.join(__dirname, '../.cache', filename)

  // Extrec contingut de l'arxiu
  const asset = fs.readFileSync(filepath, 'utf8')
  
  // Setejo ContentType depenent de l'extensio de l'asset
  res.setHeader('Content-Type', ContentTypes[ext])

  // Torno asset al browser
  res.end(asset)
}