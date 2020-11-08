const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

const PORT = 4000

const init = async ({ db }) =>
  new Promise(resolve => {
    // Creo instància del server
    const server = express()

    // Serveixo arxius estàtics desde /selector per poder servir la llibrearía que fa els hovers etc...
    server.use(express.static('public'))

    // Desprotejeixo de CORS al server per poder parlar amb l'iframe
    server.use(cors())

    // Parsejo respostes a JSON quan puc directament
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(bodyParser.json())

    // Injecto instancia de mongodb a express per tenir-la disponible a qualsevol endpoint
    server.locals.db = db

    // Rutes per la cua de jobs
    server.use('/jobs', routes.jobs)

    // Rutes pel visualitzador
    server.use('/visualize', routes.visualize)

    // Error handling
    server.use(routes.error)

    // Server comença a escoltar
    // La variable PORT hauria d'anar a variables d'entorn
    return server.listen(PORT, () => {
      console.log('✅ Server escoltant al port', PORT)
      return resolve(server)
    })
  })

module.exports = { init }