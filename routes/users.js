let express = require('express');
let router = express.Router();

const ResponseHandler =  require('../util/reponse')

const User = require('../models/users')

router.get('/', async (req, res)=>{
  try {
    let users = await User.find()
    ResponseHandler.ok(res, users)  
  } catch (error) {
    ResponseHandler.serverError(res, error)
  }
});

router.get('/:user_id', async (req, res)=>{
    try {
      let user = await User.findById(req.params.user_id)
      if(!user){
          return ResponseHandler.notFound(res, `Cannot find user for user_id :: ${req.params.user_id}`)
      }
      ResponseHandler.ok(res, user)  
    } catch (error) {
      ResponseHandler.serverError(res, error)
    }
});

router.post('/', async (req, res)=>{
    let body = req.body
    try {
      let user = await User.create(body)  
      ResponseHandler.ok(res, user)  
    } catch (error) {
      ResponseHandler.serverError(res, error)
    }
});

router.put('/contact', async (req, res)=>{
  res.json({user_id: req.param('user_id')});
});

router.delete('/contact', async (req, res)=>{
  res.json({user_id: req.param('user_id')});
});

router.delete('/:user_id', async (req, res)=>{
  res.json({user_id: req.param('user_id')});
});

module.exports = router;