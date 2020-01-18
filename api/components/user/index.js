const store = require('../../../store/dummy')
const ctrl = require('./controller')

// nuestro contralador se vulve una funcion al ejecutarlo con los parentesis y pasandole como parametro nuestro store
module.exports = ctrl(store)
