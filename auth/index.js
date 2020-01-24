const jwt = require('jsonwebtoken')

// function sign para generar el TOKEN del usuario
function sign(data) {
  return jwt.sign(data, 'secrete')  
}

module.exports = {
  sign
}
