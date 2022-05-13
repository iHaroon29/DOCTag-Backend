require('dotenv').config()
const mongoose = require('mongoose')

module.exports = function dataBaseConnection(connectionString, databaseName) {
  const connection = mongoose.createConnection(
    connectionString + '/' + databaseName
  )
  return connection
}
