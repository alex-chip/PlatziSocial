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
    if (data.password === password) {
      // generar token, y se firma la dara recibida
      return auth.sign(data)
    } else {
      // caso contrario generar un error
      throw new Error('Informacion invalida')
    }
    return data
  }

  function upsert (data) {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = data.password
    }

    return store.upsert(TABLA, authData)
  }

  return {
    upsert,
    login
  }
}
