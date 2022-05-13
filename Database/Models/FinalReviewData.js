const dbConnection = require('../DatabaseConnection')

let connection = dbConnection(
  process.env.MONGO_CONNECTION_URL_TEST,
  'PersonData'
)

connection.model('User Credential', require('../Schemas/UserCredentialSchema'))
connection.model('Users', require('../Schemas/UserCreatedSchema'))

module.exports = connection
