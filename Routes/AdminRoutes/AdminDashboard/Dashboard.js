const Express = require('express')
const Router = Express.Router()

// const {
//   hasLoggedOut,
// } = require('../../../Services/AuthenticationServices/Authentication')

// const Document = require('./Document/Document')

Router.use('/User', require('./User/User'))
Router.use('/Document', require('./Document/Document'))
Router.use(
  '/Logout',
  require('../../../Services/AuthenticationServices/Authentication')
    .hasLoggedOut
)

module.exports = Router
