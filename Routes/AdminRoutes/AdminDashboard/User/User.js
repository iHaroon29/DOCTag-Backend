const Express = require('express')
const {
  createUser,
  updateUser,
  fetchUser,
} = require('../../../../Utils/Users/Users.utils')
const Router = Express.Router()

Router.route('/createUser').post(createUser)
Router.route('/updateUser/:validEmail').post(updateUser)
// Router.route("/viewAllUsers").get(fetch)
Router.route('/viewUser/:validEmail').get(fetchUser)

module.exports = Router
