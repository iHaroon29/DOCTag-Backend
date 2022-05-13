const Express = require('express')
const Router = Express.Router()
const Dashboard = require('./UserDashboard/Dashboard')
const {
  isAuthenticated,
} = require('../../Services/AuthenticationServices/Authentication')

Router.use('/Dashboard', [isAuthenticated, Dashboard])

module.exports = Router
