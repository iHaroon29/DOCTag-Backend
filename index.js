require('dotenv').config()

const app = require('./app')

const http = require('http')

http.createServer(app)
