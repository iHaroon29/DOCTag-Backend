require('dotenv').config()
const mongoose = require('mongoose')

const connectionAuthDB = mongoose.createConnection(
  process.env.MONGO_CONNECTION_URL_AuthenticationDB
)
const UserModel = connectionAuthDB.model(
  'Users',
  require('./Schemas/UserModel')
)
const EnrolledUsers = connectionAuthDB.model(
  'Enrolled Users',
  require('./Schemas/EnrolledUser')
)

module.exports = { connectionAuthDB, UserModel, EnrolledUsers }
