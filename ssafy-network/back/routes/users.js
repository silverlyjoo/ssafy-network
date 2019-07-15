var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllUsers',function(req,res,next){
  User.find(function(err,users){
    res.json(users);
  })
});

module.exports = router;
