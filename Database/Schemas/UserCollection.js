const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const UserCredentialSchema = new Schema({
  vehicleID: {
    type: String,
  },
  vehicleNumber: {
    type: String,
  },
  vehicleOwnerName: {
    type: String,
  },
  vehicleOwnerEmail: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
  },
  vehicleOwnerPhoneNumber: {
    type: String,
    required: true,
  },
  vehicleQRCode: {
    type: String,
  },
  vehicleDocuments: [
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
