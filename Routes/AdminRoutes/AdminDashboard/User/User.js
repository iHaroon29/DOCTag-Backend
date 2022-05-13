const Express = require('express')
const {
  createUser,
  updateUser,
  fetchUser,
} = require('../../../../Utils/Users/Users.utils')
const Router = Express.Router()

Router.route('/createUser').post(createUser)
Router.route('/updateUser/:validPhoneNumber').post(updateUser)
Router.route('/viewUser/:validPhoneNumber').get(fetchUser)

module.exports = Router
