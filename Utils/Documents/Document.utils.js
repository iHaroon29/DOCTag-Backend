require('dotenv').config()
const { dependencyInjector } = require('../../Database/Models/DocTagModel')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')
const {
  qrCodeSequenceGeneration,
  qrCodeImageGenerator,
} = require('../QRCode/qrCode.utils')

// Create Task Flow

const createDocument = async (req, res) => {
  const vehicleDetails = await dependencyInjector(res.locals.collectionName)
  const {
    vehicleNumber,
    vehicleOwnerName,
    vehicleOwnerEmail,
    vehicleOwnerPhoneNumber,
    vehicleDocuments,
  } = req.body
  try {
    const qrCodeSequence = await await qrCodeSequenceGeneration(
      vehicleNumber,
      vehicleOwnerName,
      vehicleOwnerEmail,
      vehicleOwnerPhoneNumber
    )
    let record = await vehicleDetails.findOneAndUpdate(
      {
        vehicleNumber: vehicleNumber,
      },
      {
        vehicleID: qrCodeSequence,
        vehicleNumber: vehicleNumber,
        vehicleOwnerName: vehicleOwnerName,
        vehicleOwnerEmail: vehicleOwnerEmail,
        vehicleOwnerPhoneNumber: vehicleOwnerPhoneNumber,
        vehicleQRCode: await qrCodeImageGenerator(
          qrCodeSequence,
          res.locals.collectionName
        ),
        $push: { vehicleDocuments: vehicleDocuments },
      },
      {
        new: true,
        upsert: true,
      }
    )
    await res.status(200).send({
      status: 200,
      message: `Thank you for Submitting your documents for ${vehicleNumber}`,
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

const fetchAllVehicles = async (req, res, next) => {
  try {
    let UserCollection = await dependencyInjector(res.locals.collectionName)
    const allVehicles = await UserCollection.find({})
    await res.status(200).send({
      status: 200,
      allVehicles,
    })
  } catch (e) {
    console.log(e)
    res.status(400).send({
      status: 400,
      message: e.message,
    })
  }
}

// Fetch Task Flow

const fetchDocument = async (req, res, next) => {
  try {
    let UserCollection = await dependencyInjector(res.locals.collectionName)
    let vehicle = await UserCollection.findOne({
      vehicleID: req.params.vehicleID,
    })
    if (vehicle === null) {
      throw DataBaseError({
        name: 'applicantNull',
        value: req.params.vehicleID,
      })
    }
    let document
    vehicle.vehicleDocuments.forEach((node) => {
      node.documentName === req.params.documentName ? (document = node) : null
    })
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
    let UserCollection = await dependencyInjector(res.locals.collectionName)
    let vehicle = await UserCollection.findOne({
      vehicleID: req.params.vehicleID,
    })
    res.status(200).send({ status: 200, vehicle })
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
    let UserCollection = await dependencyInjector(res.locals.collectionName)
    await UserCollection.findOneAndUpdate(
      {
        vehicleID: req.params.vehicleID,
      },
      { $push: { vehicleDocuments: req.body.vehicleDocuments } }
    )
    await res
      .status(200)
      .send({ status: 200, message: 'Vehicle Documents Updated' })
  } catch (err) {
    console.log(error.message)
    res.status(400).send({
      status: 400,
      message: error.message,
    })
  }
}

const deleteVehicle = async (req, res, next) => {
  try {
    const vehicleDetails = await dependencyInjector(res.locals.collectionName)
    let response = await vehicleDetails.findOneAndDelete(req.params.vehicleID)
    // const allVehicles = await vehicleDetails.find({})
    await res.status(200).send({
      status: 200,
      message: `${response.vehicleNumber} has been deleted.`,
    })
  } catch (e) {
    await res.status(400).send({
      status: 200,
      message: e.message,
    })
  }
}

module.exports = {
  createDocument,
  fetchDocument,
  fetchDocuments,
  updateDocument,
  fetchAllVehicles,
  deleteVehicle,
}
