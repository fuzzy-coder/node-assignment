let express = require('express');
let router = express.Router();

let NumberUtil = require('../util/number')

router.get('/node/:last', async(req, res, next)=>{
  let store = [];
  let last = req.params.last || 0
  for(let i=2; i < last; i++){
      if(NumberUtil.isPrime(i)){
        store.push(i)
      }
  }
  res.json(store);
});

module.exports = router;