const server = require('./server')
const mongo = require('./mongo')

;(async () => {
  // em connecto a mongo
  const db = await mongo.connect()

  // creo el server
  await server.init({ db })
})();