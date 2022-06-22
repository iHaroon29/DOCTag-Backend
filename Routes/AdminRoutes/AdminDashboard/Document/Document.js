const Express = require('express')
const {
  createDocument,
  updateDocument,
  fetchDocuments,
  fetchDocument,
} = require('../../../../Utils/Documents/Document.utils')
const Router = Express.Router()

Router.route('/:vehicleID/:typeOfDocument/createDocument').post(createDocument)
Router.route(
  '/:vehicleID/:typeOfDocument/updateDocument/:applicantCredHash'
).post(updateDocument)
// Router.route('/:vehicleID/:typeOfDocument/viewAllDocuments').get(fetchDocuments)
Router.route('/:vehicleID/:typeOfDocument/viewDocument/:applicantCredHash').get(
  fetchDocument
)

module.exports = Router
