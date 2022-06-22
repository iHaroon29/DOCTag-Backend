const connection = require('../DatabaseConnection')

const dependencyInjector = async (collectionName) => {
  console.log(collectionName)
  const UserCollection = connection.model(
    collectionName + '_vehicles',
    require('../Schemas/UserCollection')
  )
  return UserCollection
}

module.exports = {
  connection,
  dependencyInjector,
}
