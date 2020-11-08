const puppeteer = require('puppeteer')
const Assets = require('./assets')

// Extrec extensio d'una URL
const getExtension = url => url.split(/[#?]/)[0].split('.').pop().trim()

async function getInteractivePage (url) {
  // Mapa de assets [url]: path
  const assets = {}

  // Creo navegador puppeteer
  const browser = await puppeteer.launch()

  // Obro nova pagina
  const page = await browser.newPage()

  // Habilito interceptar requests
  // await page.setRequestInterception(true)

  // Això en teoria hauria de fer que capturem tambe les requests que emeten els ServiceWorkers
  // Airbnb per exemple, els fa servir per fer les peticions a la seva api
  // Pero jo diria que no rula de res :_(
  page._client.send('Network.setBypassServiceWorker', {bypass: true})

  // Intercepto les respostes dels assets
  page.on('response', async (res) => {
    // Si es un redirect, sudo 100% (de moment)
    if ((res.status() >= 300) && (res.status() <= 399)) {
      return
    }

    // Intercepto nomes respostes del mateix host
    // Perque entenc, que si la web original ja permetia decarregar-se coses de tercers
    // No ens les bloquejarà tampoc a nosaltres
    if (res.url().includes(url.hostname) && res.url() !== url.protocol + '//' + url.hostname) {
      // Guardo asset
      const filepath = await Assets.save(res.url(), await res.text())
  
      // Si l'asset s'ha guardat correctament, guardo la URL al mapa
      if (filepath) {
        assets[res.url()] = filepath
      }
    }
  })

  // De moment intercepto redirects desde el client
  // I els inhabilito for the sake of simplicity
  // page.on('request', request => {
  //   if (request.isNavigationRequest()) {
  //     return request.abort()
  //   }
  //   request.continue()
  // })

  // Navego a la URL desitjada i m'espero que acabin totes les requests
  await page.goto(url.href, { waitUntil: 'networkidle2' })

  // Torno contingut i assets
  return { content: await page.content(), assets }
}

module.exports = {
  getInteractivePage,
  getExtension
}