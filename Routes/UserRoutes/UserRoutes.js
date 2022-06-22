const Express = require('express')
const Router = Express.Router()
const Dashboard = require('./UserDashboard/Dashboard')
const {
  isAuthenticated,
  CollectionValidation,
} = require('../../Services/AuthenticationServices/Authentication')

Router.use('/:userName/Dashboard', [
  isAuthenticated,
  CollectionValidation,
  Dashboard,
])

module.exports = Router
