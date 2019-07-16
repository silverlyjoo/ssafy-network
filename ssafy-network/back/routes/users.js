var express = require('express');
var router = express.Router();
var User = require('../models/user');

//모든 유저 리스트를 반환
router.post('/getAllUsers', function(req,res){
  var sort = {name: 1};
  User.find(function(err, users){
      if(err) {
        return res.status(500).send({error: 'database failure'});
      }
      res.json(users);
  }).sort(sort);
});

//아이디를 통해 유저 정보 반환
router.post('/getUserById', function(req, res){
  User.findOne({id: req.body.id}, function(err, user){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!user){
        return res.status(404).json({error: 'user not found'});
      } 
      res.json(user);
  })
});

//아이디를 통해 그런 아이디를 가진 유저가 있는지 확인
router.post('/getUserByIdCheck', function(req, res){
  User.findOne({id: req.body.id}, function(err, user){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!user){
        return res.json({result:false});
      } 
      res.json({result:true});
  })
});

//멤버쉽 정보를 통해 유저 정보 반환
router.post('/getUserByMembership', function(req, res){
  User.find({membership: req.body.membership}, function(err, users){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!users){
        return res.status(404).json({error: 'user not found'});
      } 
      res.json(users);
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

  console.log(req.body);

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
router.put('/updateUserById/:id', function(req, res){
  User.update({ id: req.params.id }, { $set: req.body }, function(err, output){
      if(err){
        res.status(500).json({ error: 'database failure' });
      }
      console.log(output);
      if(!output.n){
        return res.status(404).json({ error: 'user not found' });
      } 
      res.json({result: 1});
  })
});

//유저 정보를 삭제한다.
router.delete('/deleteUserById/:id', function(req, res){
  User.remove({ id: req.params.id }, function(err, output){
      if(err){
        return res.status(500).json({ error: "database failure" });
      } 
      res.json({result: 1});
  })
});

//로그인
router.post('/Login', function(req, res){
  User.findOne({id: req.body.id, pwd: req.body.pwd}, function(err, user){
    if(err){
      return res.status(500).json({error: err});
    } 
    if(!user){
      return res.status(404).json({error: 'user not found'});
    } 
    res.json(user);
  });
});

module.exports = router;
