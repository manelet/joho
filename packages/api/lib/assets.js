const fs = require('fs')
const Url = require('url')
const path = require('path')

module.exports = {
  save: async (_url, content) => {
    // Parsejo URL
    const url = Url.parse(_url)

    // Contstrueixo nom del asset
    // - Elimino el domini i protocol (https://www.google.com/) si es que hi es
    // - Converteixo / a - per poder guardar l'axriu
    const filename = url.href.replace(`${url.protocol}//${url.hostname}`, '').replace(/\//gi, '-')

    // De moment, guardo els arxius fisicament a .cache
    // Aixo es per testing purposes, a la hora de la veritat, hem d'estudiar com guardem aquests arxius
    // Tinc dubtes, són arxius temporals o els guardem X tems?
    // Probablament cada vegada que l'usuari volgui editar el process necessitarem tornar a executar aquest proces
    const filepath = path.join(__dirname, '../.cache/', filename)

    // Guardo arxiu, dins un try catch, perque si ja existeix peta per defecte, aixi no dona pel cul
    // Això a prod mai ha d'anar així.
    try { fs.writeFileSync(filepath, content, { flag: 'wx' }) } catch (e) {}

    // Torno ruta de l'arxiu
    return filepath
  },
  load: url => {}
}