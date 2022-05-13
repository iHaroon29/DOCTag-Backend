const Express = require('express')
const Router = Express.Router()

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

const Document = require('./Document/Document')

Router.use('/Document', Document)
Router.use('/Logout', hasLoggedOut)

module.exports = Router
