const Express = require('express')
const {
  createDocument,
  fetchDocuments,
  fetchDocument,
  fetchAllVehicles,
  updateDocument,
  fetchQRCode,
  deleteVehicle,
} = require('../../../../Utils/Documents/Document.utils')
const Router = Express.Router()

Router.route('/getAllVehicles').get(fetchAllVehicles)
Router.route('/createDocument').post(createDocument)
Router.route('/:vehicleID/viewAllDocument').get(fetchDocuments)
Router.route('/:vehicleID/fetchQRCode').get(fetchDocuments)
Router.route('/:vehicleID/deleteVehicle').get(deleteVehicle)
Router.route('/:vehicleID/viewDocument/:documentName').get(fetchDocument)
Router.route('/:vehicleID/updateDocument').put(updateDocument)
module.exports = Router
