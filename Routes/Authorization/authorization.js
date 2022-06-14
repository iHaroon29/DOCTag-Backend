const {
  isAuthorized,
} = require('../../Services/AuthenticationServices/Authentication')
const { createUser } = require('../../Utils/Users/Users.utils')
const Router = require('express').Router()

Router.route('/Login').post(isAuthorized)
Router.route('/Signup').post(createUser)

module.exports = Router
