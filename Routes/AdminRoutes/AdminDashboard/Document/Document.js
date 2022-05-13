const Express = require('express')
const {
  createDocument,
  updateDocument,
  fetchDocuments,
  fetchDocument,
} = require('../../../../Utils/Documents/Document.utils')
const Router = Express.Router()

Router.route('/createDocument').post(createDocument)
Router.route('/updateDocument/:applicantCredHash').post(updateDocument)
// Router.route('/viewAllDocuments').get(fetchDocuments)
Router.route('/viewDocument/:applicantCredHash').get(fetchDocument)

module.exports = Router
