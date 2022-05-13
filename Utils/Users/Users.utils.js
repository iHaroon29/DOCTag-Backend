const crypto = require('crypto')
const bcrypt = require('bcrypt')
const connection = require('../../Database/Models/CarDocumentModel')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')

// Create Task Flow

const createUser = async (req, res) => {
  try {
    let newUser = await new connection.models['Users']({
      userID: crypto.randomBytes(20).toString('hex'),
      userName: req.body.userName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      typeOfUser: req.body.typeOfUser,
      createdOn: new Date().toLocaleString(),
      updatedOn: new Date().toLocaleString(),
    })
    await newUser.save()
    res.status(200).send({ status: 200, message: 'User created!' })
  } catch (error) {
    let ErrorResponse = DataBaseError(error)
    console.log(ErrorResponse.errMessage)
    res.status(ErrorResponse.errStatusCode).send({
      status: ErrorResponse.errStatusCode,
      message: ErrorResponse.errMessage,
    })
  }
}

// Fetch Task Flow

const fetchUser = async (req, res, next) => {
  try {
    let User = await new connection.models['Users'].findOne(
      {
        email: req.params.email,
      },
      { password: 0, userID: 0 }
    )
    if (User === null) {
      throw new Error('No such Entry found')
    }
    res.status(200).send({ status: 200, User })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}

// Update Task Flow

const updateUser = async (req, res, next) => {
  try {
    UserModel.findOneAndUpdate(
      {
        email: req.params.email,
      },
      { taskList: req.body.taskList },
      (err, doc) => {
        if (err) throw new Error(err)
        res.send({ status: 200, message: 'Task Updated' })
      }
    )
  } catch (err) {
    console.log(error.message)
    res.status(200).send({
      status: 400,
      message: error.message,
    })
  }
}

module.exports = {
  createUser,
  fetchUser,
  updateUser,
}
