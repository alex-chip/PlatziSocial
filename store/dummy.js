const db = {
  user: [
    { id: 1, name: 'Alex' }
  ]
}

function list (tabla) {
  return db[tabla]
}

function get (tabla, id) {
  let coll = list[tabla]
  return coll.filter(item => item.id === id)[0] || null
}

function upsert (tabla, data) {
  db[collection].push(data)
}

function remove (tabla, id) {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
