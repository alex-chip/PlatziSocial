const { Router } = require('express')
const response = require('../../../network/response')
const router = Router()

router
  .get('/', (req, res) => {
    // res.send('Todo Funciona')
    response.success(req, res, 'Todo funciona', 200)
  })

module.exports = router
