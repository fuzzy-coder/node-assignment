let express = require('express');
let router = express.Router();

let NumberUtil = require('../util/number')
let NativeNumberUtil = require('../build/Release/addon')
let ResponseHandler = require('../util/reponse')

router.get('/node/:last', async(req, res, next)=>{
  let store = [];
  let last = req.params.last || 0
  if(!/[0-9]+/.test(last) || last < 2){
    return ResponseHandler.badRequest(res, "Input parameter should be a valid number greater than 2")
  }
  for(let i=2; i < last; i++){
      if(NumberUtil.isPrime(i)){
        store.push(i)
      }
  }
  ResponseHandler.ok(res, store)
});

router.get('/native/:last', async(req, res, next)=>{
  let store = [];
  let last = req.params.last || 0
  if(!/[0-9]+/.test(last) || last < 2){
    return ResponseHandler.badRequest(res, "Input parameter should be a valid number greater than 2")
  }
  for(let i=2; i < last; i++){
      if(NativeNumberUtil.IsPrime(i)){
        store.push(i)
      }
  }
  ResponseHandler.ok(res, store)
});

module.exports = router;