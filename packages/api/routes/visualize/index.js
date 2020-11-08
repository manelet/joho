const router = require('express').Router()
const process = require('./process')
const assets = require('./assets')

router.get('/', process)
router.get('*', assets)

module.exports = router