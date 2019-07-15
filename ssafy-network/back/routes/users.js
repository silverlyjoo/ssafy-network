var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/getAllUsers', function(req,res){
  User.find(function(err, users){
      if(err) {
        return res.status(500).send({error: 'database failure'});
      }
      res.json(users);
  });
});

router.post('/setUser', function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.id = req.body.id;
  user.pwd = req.body.pwd;
  user.nickname = req.body.nickname;
  user.region = req.body.region;
  user.year = req.body.year;
  user.membership = req.body.membership;

  user.save(function(err){
      if(err){
          console.error(err);
          res.json({result: 0});
          return;
      }

      res.json({result: 1});

  });
});


module.exports = router;
