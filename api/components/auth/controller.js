// libreria para sifrar contraseñas
const bcrypt = require('bcrypt')

// requerir el archico auth donde se genera el TOKEN
const auth = require('../../../auth')

const TABLA = 'auth'
module.exports = (injectedStore) => {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }
  
  // Funcion para loguear al usuario
  async function login (username, password) {
    const data = await store.query(TABLA, { username: username})
    
    // comparar el password, se retorna el token si es true o un error si es falso
    return bcrypt.compare(password, data.password)
      .then(sonIguales => {
        if (sonIguales === true) {
          // generar token, y se firma la data recibida
          return auth.sign(data)
        } else {
          // caso contrario generar un error
          throw new Error('Informacion invalida')
        }
      })
    // return data
  }

  async function upsert (data) {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      // authData.password = data.password
      // cifrando el password
      authData.password = await bcrypt.hash(data.password, 8)
    }

    return store.upsert(TABLA, authData)
  }

  return {
    upsert,
    login
  }
}
