require('dotenv').config()
const { ReviewDataSchema } = require('../../Database/Models/DocTagModel')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')
const {
  qrCodeSequenceGeneration,
  qrCodeImageGenerator,
} = require('../QRCode/qrCode.utils')

// Create Task Flow

const createDocument = async (req, res) => {
  try {
    let newUserReview = await new ReviewDataSchema({
      applicantID: await qrCodeSequenceGeneration(
        req.body.applicantName,
        req.body.applicantEmail,
        req.body.applicantPhoneNumber
      ),
      applicantName: req.body.applicantName,
      applicantEmail: req.body.applicantEmail,
      applicantPhoneNumber: req.body.applicantPhoneNumber,
      applicantDocuments: req.body.applicantDocuments,
    })
    let qrCodeBaseURL = await qrCodeImageGenerator(newUserReview.applicantID)
    await newUserReview.save()
    await res.status(200).send({
      status: 200,
      qrCode: qrCodeBaseURL,
      applicantID,
      message: 'Documents have been Submitted for verification.',
    })
  } catch (error) {
    // console.log(error)
    let ErrorResponse = DataBaseError(error)
    console.log(ErrorResponse.errMessage)
    res.status(ErrorResponse.errStatusCode).send({
      status: ErrorResponse.errStatusCode,
      message: ErrorResponse.errMessage,
    })
  }
}

// Fetch Task Flow

const fetchDocument = async (req, res, next) => {
  try {
    let document = await ReviewDataSchema.findOne({
      applicantID: req.params.applicantCredHash,
    })
    if (document === null) {
      throw DataBaseError({
        name: 'applicantNull',
        value: req.params.applicantCredHash,
      })
    }
    res.status(200).send({ status: 200, document })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}

const fetchDocuments = async (req, res, next) => {
  try {
    let taskFlows = await ReviewDataSchema.find({})
    if (taskFlows === null) {
      throw new Error("Can't fetch Flow's contact Devs")
    }
    res.status(200).send({ status: 200, taskFlows })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}
// Update Task Flow

const updateDocument = async (req, res, next) => {
  try {
    await ReviewDataSchema.findOneAndUpdate(
      {
        applicantID: req.params.applicantCredHash,
      },
      { applicantDocuments: req.body.applicantDocuments },
      (err, doc) => {
        if (err) throw new Error(err)
        res.status(200).send({ status: 200, message: 'Task Updated' })
      }
    )
  } catch (err) {
    console.log(error.message)
    res.status(400).send({
      status: 400,
      message: error.message,
    })
  }
}

module.exports = {
  createDocument,
  fetchDocument,
  fetchDocuments,
  updateDocument,
}
