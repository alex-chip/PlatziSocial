const { Router } = require('express')
const response = require('../../../network/response')
const Controller = require('./controller')
const router = Router()

router
  .get('/', (req, res) => {
    // res.send('Todo Funciona')
    const lista = Controller.list()
    response.success(req, res, lista, 200)
  })

module.exports = router
