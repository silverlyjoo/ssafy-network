var express = require('express');
var router = express.Router();
var User = require('../models/user');

//모든 유저 리스트를 반환
router.get('/getAllUsers', function(req,res){
  User.find(function(err, users){
      if(err) {
        return res.status(500).send({error: 'database failure'});
      }
      res.json(users);
  });
});

//아이디를 통해 유저 정보 반환
router.get('/getUserInfo/:id', function(req, res){
  User.findOne({id: req.params.id}, function(err, user){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!user){
        return res.status(404).json({error: 'user not found'});
      } 
      res.json(user);
  })
});

//유저를 추가한다.
router.post('/addUser', function(req, res){
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


//유저 정보를 업데이트한다.
router.put('/updateUser/:id', function(req, res){
  User.update({ id: req.params.id }, { $set: req.body }, function(err, output){
      if(err){
        res.status(500).json({ error: 'database failure' });
      }
      console.log(output);
      if(!output.n){
        return res.status(404).json({ error: 'user not found' });
      } 
      res.json( { message: 'user updated' } );
  })
});

//유저 정보를 삭제한다.
router.delete('/deleteUser/:id', function(req, res){
  User.remove({ id: req.params.id }, function(err, output){
      if(err){
        return res.status(500).json({ error: "database failure" });
      } 
      res.status(204).end();
  })
});

module.exports = router;
