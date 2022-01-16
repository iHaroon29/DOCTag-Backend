require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const dbo = require('./dataBaseFile')
const portNumber = process.env.portnumber || process.argv[2] || 8000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    data: 'This is cool',
  })
})

app.post('/dataFetch', (req, res) => {
  dbo(req.body, 'find', res)
})
app.post('/admin/dataUpload', (req, res) => {
  res.status(400).send('denied')
})
app.listen(portNumber, () => {
  console.log(`Listening on ${portNumber}`)
})
