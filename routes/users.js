let express = require('express');
let router = express.Router();


router.get('/', async (req, res)=>{
  res.json({user_id: req.param('user_id')});
});

router.get('/:user_id', async (req, res)=>{
  res.json({user_id: req.param('user_id')});
});

router.post('/', async (req, res)=>{
  res.json({user_id: req.param('user_id')});
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