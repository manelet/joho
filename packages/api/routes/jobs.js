const express = require('express')
const router = express.Router()

// A qualsevol d'aquests endpoints ja tens disponible
// la conexió al a db, per accedir-hi:
// req.app.locals.db
router.post('/', (req, res) => {
  res.send({ action: 'create', ...req.body })
})

router.get('/:jobId', (req, res) => {
  res.send({ action: 'read', jobId: req.params.jobId })
})

router.delete('/:jobId', (req, res) => {
  res.send({ action: 'delete', jobId: req.params.jobId })
})

router.put('/:jobId', (req, res) => {
  res.send({ action: 'update', jobId: req.params.jobId })
})

module.exports = router