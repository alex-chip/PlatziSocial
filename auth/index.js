const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.jwt.secret

// function sign para generar el TOKEN del usuario
function sign(data) {
  // retornamos el token firmado
  return jwt.sign(data, secret)  
}

// verificar el token
function verify(token) {
  // tratar con try catch la comparacion del token
  try {
    return jwt.verify(token, secret) 
  } catch (e) {
    throw new Error(e.message)
  }
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req)
    console.log(decoded)
    
    // comprobar el token si es propio del usuario
    if (decoded.id !== owner) {
      throw new Error('No puedes hacer esto')
    }
  }
}

function getToken(auth) {
  // comprobando ti viene el token
  if (!auth) {
    throw new Error('No viene token')
  }
  
  // comprobando si el token tiene el formato correcto
  if (auth.indexOf('Bearer') === -1) {
    throw new Error('Formato invalido')
  }
  
  // quitando la palabra 'Bearer' para poder verificar el token
  // el token viene con el siguiente formato "Bearer XXXX"
  /*
  * Para poder comparar el token se puede hacer de la siguiente forma
  * con replace('Bearer ', '') => la palabra Bearer esta seguido de un espacio
  * tambien se puede usar token.trim() => lo que hace es quitar los espacios en blanco
  * y asi poder realizar la comparacion
  * */
  let token = auth.replace('Bearer ', '')
  return token
}

// function para decodificar el token
function decodeHeader(req) {
  // authorization es el header a recibir
  const authorization = req.headers.authorization || ''
  
  // obtener el token
  const token = getToken(authorization)
  
  // verificando el token si el valido
  const decoded = verify(token)
  
  req.user = decoded
  
  return decoded
}

module.exports = {
  sign,
  check
}
