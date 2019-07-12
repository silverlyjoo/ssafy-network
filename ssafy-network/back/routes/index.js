var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/user/:id',function(req,res){
  User.find({id:req.params.id},function(err,user){
    res.render('index',{user:user});
  })
});

module.exports = router;
