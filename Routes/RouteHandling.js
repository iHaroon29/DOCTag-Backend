const Express = require('express')
const Router = Express.Router()
const cors = require('cors')
const helmet = require('helmet')

const AdminRoutes = require('./AdminRoutes/AdminRoutes')
const UserRoutes = require('./UserRoutes/UserDashboard/Dashboard')
const {
  isAuthorized,
} = require('../Services/AuthenticationServices/Authentication')

Router.use(cors())
Router.use(helmet())
Router.use(Express.json())

Router.post('/Login', isAuthorized)
Router.use('/Admin', AdminRoutes)
Router.use('/User', UserRoutes)

module.exports = Router
