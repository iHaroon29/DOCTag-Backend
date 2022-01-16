require('dotenv').config()
const { MongoClient } = require('mongodb')
const connectionString = process.env.secretKey
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const dataSubmittion = (data, command, res) => {
  client.connect((err, db) => {
    if (err) console.log(err)
    if (command === 'upload') {
      db.db('userData')
        .collection(data.UID)
        .insertOne(data, (err, result) => {
          if (err) console.log(err)
          console.log('uploaded')
        })
    } else {
      db.db('userData')
        .collection(data.data)
        .find({})
        .toArray((err, result) => {
          if (err) console.log(err)
          res.status(200).send(result)
        })
    }
  })
}

module.exports = dataSubmittion
