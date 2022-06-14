const connection = require('../DatabaseConnection')

const ReviewDataSchema = connection.model(
  'Review',
  require('../Schemas/UserCredentialSchema')
)

const FinalDataSchema = connection.model(
  'Final',
  require('../Schemas/UserCredentialSchema')
)

const UserModel = connection.model('User', require('../Schemas/UserModel'))

module.exports = {
  connection,
  FinalDataSchema,
  ReviewDataSchema,
  UserModel,
}
