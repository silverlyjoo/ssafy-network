var express = require('express');
var router = express.Router();
var User = require('../models/user');

/**
 * @swagger
 *  /users/all:
 *    get:
 *      tags:
 *      - User
 *      description: 모든 유저 리스트를 반환
 *      responses:
 *       200:
 *        description: 유저 정보를 json 리스트에 담음
 */
router.get('/all', function(req,res){
  var rule = {name: 1};
  User.find(function(err, users){
      if(err) {
        return res.status(500).send({error: 'database failure'});
      }
      res.json(users);
  }).sort(rule);
});

/**
 * @swagger
 *  /users/{id}:
 *    get:
 *      tags:
 *      - User
 *      description: 아이디로 유저정보 반환.
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "아이디"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 유저 정보를 json에 담음
 */
router.get('/:id', function(req, res){
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

/**
 * @swagger
 *  /users/{id}/icheck:
 *    get:
 *      tags:
 *      - User
 *      description: 아이디 중복 체크
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "아이디"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: true 일 경우 중복
 */
router.get('/:id/icheck', function(req, res){
  User.findOne({id: req.params.id}, function(err, user){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!user){
        return res.json({result:false});
      } 
      res.json({result:true});
  })
});

/**
 * @swagger
 *  /users/{nickname}/ncheck:
 *    get:
 *      tags:
 *      - User
 *      description: 닉네임 중복 체크
 *      parameters:
 *      - name: nickname
 *        in: path
 *        description: "닉네임"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: true 일 경우 중복
 */
router.get('/:nickname/ncheck', function(req, res){
  User.findOne({nickname: req.params.nickname}, function(err, user){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!user){
        return res.json({result:false});
      } 
      res.json({result:true});
  })
});

/**
 * @swagger
 *  /users/{membership}:
 *    get:
 *      tags:
 *      - User
 *      description: 멤버쉽으로 유저 정보 반환.
 *      parameters:
 *      - name: membership
 *        in: path
 *        description: "회원/비회원"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 회원인지 비회원인지 판단
 */
router.get('/:membership', function(req, res){
  User.find({membership: req.params.membership}, function(err, users){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!users){
        return res.status(404).json({error: 'user not found'});
      } 
      res.json(users);
  })
});

/**
 * @swagger
 *  /users:
 *    post:
 *      tags:
 *      - User
 *      description: 유저 정보를 추가
 *      parameters:
 *      - in: body
 *        name: addUser
 *        description: "유저 정보 추가"
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            id:
 *              type: string
 *              required: true
 *            pwd:
 *              type: string
 *              required: true
 *            nickname:
 *              type: string
 *            region:
 *              type: string
 *            year:
 *              type: integer
 *            membership:
 *              type: boolean
 *      responses:
 *       200:
 *        description: "result = 1 일 경우 정상적으로 작동"
 */
router.post('/', function(req, res){
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


/**
 * @swagger
 *  /users/id:
 *    put:
 *      tags:
 *      - User
 *      description: 유저 정보를 업데이트
 *      parameters:
 *      - in: body
 *        name: updateUser
 *        description: "유저 정보 업데이트"
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            id:
 *              type: string
 *              required: true
 *            pwd:
 *              type: string
 *            nickname:
 *              type: string
 *            region:
 *              type: string
 *            year:
 *              type: integer
 *            membership:
 *              type: boolean
 *      responses:
 *       200:
 *        description: result = 1 일 경우 정상적으로 작동
 */
router.put('/id', function(req, res){
  User.update({ id: req.body.id }, { $set: req.body }, function(err, output){
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

/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      tags:
 *      - User
 *      description: 유저 삭제
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "아이디"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 아이디를 통해 유저 삭제
 */
router.delete('/:id', function(req, res){
  User.remove({ id: req.params.id }, function(err, output){
      if(err){
        return res.status(500).json({ error: "database failure" });
      } 
      res.json({result: 1});
  })
});

/**
 * @swagger
 *  /users/login:
 *    post:
 *      tags:
 *      - User
 *      description: 로그인
 *      parameters:
 *      - in: body
 *        name: login
 *        description: "로그인"
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              required: true
 *            pwd:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: 성공시 result = true
 */
router.post('/login', function(req, res){
  User.findOne({id: req.body.id, pwd: req.body.pwd}, function(err, user){
    if(err){
      return res.status(500).json({error: err});
    } 
    if(!user){
      return res.json({result: false});
    } 
    res.json({result: true});
  });
});

module.exports = router;
