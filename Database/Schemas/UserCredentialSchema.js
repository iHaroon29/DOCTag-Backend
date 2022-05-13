const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const UserCredentialSchema = new Schema({
  applicantID: {
    type: String,
    unique: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
  },
  applicantPhoneNumber: {
    type: String,
    required: true,
  },
  applicantDocuments: [
    {
      documentName: {
        type: String,
        required: true,
      },
      documentID: {
        type: String,
        required: true,
      },
      documentValidity: {
        type: String,
        required: true,
      },
      documentImageBase64String: {
        type: String,
        required: true,
      },
      documentVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
})
module.exports = UserCredentialSchema
