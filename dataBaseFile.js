require('dotenv').config()
const { MongoClient } = require('mongodb')
const connectionString = process.env.secretKey
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const dataSubmittion = async (data, command, res) => {
  try {
    let databaseConnection = await client.connect()
    if (command === 'upload') {
      await databaseConnection.db('userData').collection(data.UID).insertOne()
    } else {
      let dataFetched = await databaseConnection
        .db('userData')
        .collection(data.data)
        .find({})
        .toArray()
      res.status(200).send(dataFetched)
    }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = dataSubmittion
