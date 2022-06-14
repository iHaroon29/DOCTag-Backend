const Express = require('express')
const {
  createDocument,
  fetchDocuments,
  fetchDocument,
} = require('../../../../Utils/Documents/Document.utils')
const Router = Express.Router()

Router.route('/createDocument').post(createDocument)
// Router.route('/viewAllDocuments').get(fetchDocuments)
Router.route('/viewDocument/::applicantCredHash').get(fetchDocument)

module.exports = Router
