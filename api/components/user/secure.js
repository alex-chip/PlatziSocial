const auth = require('../../../auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      // comprueba la accion UPDATE, si el owner tiene los permisos para realizar la accion 
      case 'update':
        // owner es el id del usuario  que nos viene
        const owner = req.body.id
        auth.check.own(req, owner)
        next()
        break
      default:
        next()
    }
  }
  
  return middleware
}
