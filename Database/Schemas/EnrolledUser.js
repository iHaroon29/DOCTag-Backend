const Schema = require('mongoose').Schema

const enrolledUser = new Schema({
  userID: {
    type: String,
  },
  userName: {
    type: String,
  },
  collectionName: {
    type: String,
  },
})

module.exports = enrolledUser
