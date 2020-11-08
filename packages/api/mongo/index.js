const mongo = require('mongodb').MongoClient
const DB_NAME = 'crawler'

// Aixo es perque no mostri el warning guarro aquest a l'inici
const defaultOptions = { useUnifiedTopology: true }

// funcio per connectar-se a db que retorna instancia de mongodb ja conectada
const connect = (options = {}) =>
  // es un procés asíncron per tant torno una promesa
  new Promise((resolve, reject) => {
    // executo connexio a mongodb
    mongo.connect(
      'mongodb://localhost:27017', // aixo haurà d'anar a variables d'entorno
      { ...defaultOptions, ...options }, // mesclo opcions per default i les que es volguin passar per paràmetre
      // Funcio de callback, s'executa un cop s'ha acabat l'execució de mongo.connect
      (err, client) => {
        // Si hi ha errors, fem reject de la promesa
        if (err) { // Si hi ha error
          return reject(err)
        }

        const db = client.db(DB_NAME)

        console.log('✅ MongoDB');
        // torno instancia de mongodb
        return resolve(db)
      })    
  })

module.exports = { connect }