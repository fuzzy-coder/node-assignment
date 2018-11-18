let express = require('express');
let router = express.Router();

const ResponseHandler = require('../util/reponse')

const {
  User,
  UserContact
} = require('../models/users')

router.get('/', async (req, res) => {
  try {
    let users = await User.find().populate('contacts')
    ResponseHandler.ok(res, users)
  } catch (error) {
    ResponseHandler.serverError(res, error)
  }
});

router.get('/:user_id', async (req, res) => {
  try {
    let user = await User.findById(req.params.user_id)
    if (!user) {
      return ResponseHandler.notFound(res, `Cannot find user for user_id :: ${req.params.user_id}`)
    }
    ResponseHandler.ok(res, user)
  } catch (error) {
    ResponseHandler.serverError(res, error)
  }
});

router.post('/', async (req, res) => {
  let body = req.body
  try {
    let user = await User.create(body)
    ResponseHandler.ok(res, user)
  } catch (error) {
    ResponseHandler.serverError(res, error)
  }
});

router.put('/:user_id/contact', async (req, res) => {
  let contact = req.body
  try {
    let user = await User.findById(req.params.user_id)

    if (!user) {
      return ResponseHandler.notFound(res, `Cannot find user for user_id :: ${req.params.user_id}`)
    }

    contact.user = user._id

    let userContact = await UserContact.create(contact)

    user.contacts.push(userContact._id)
    await user.save()

    ResponseHandler.ok(res, userContact)
  } catch (error) {
    ResponseHandler.serverError(res, error)
  }
});

router.delete('/:user_id', async (req, res) => {
  try {
    let user = await User.findById(req.params.user_id)

    if (!user) {
      return ResponseHandler.notFound(res, `Cannot find user for user_id :: ${req.params.user_id}`)
    }

    await user.remove()

    ResponseHandler.ok(res, "User deleted successfully")
  } catch (error) {
    ResponseHandler.serverError(res, error)
  }

});

module.exports = router;