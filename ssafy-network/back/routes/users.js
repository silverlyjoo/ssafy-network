var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Supertree = require('../models/supertree');
var encode = require('../encode');
var decode = require('../decode');
 

/**
 * @swagger
 *  /users/{token}:
 *    get:
 *      tags:
 *      - User
 *      description: 모든 유저 리스트를 반환
 *      parameters:
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 유저 정보를 json 리스트에 담음
 */
router.get('/:token', function (req, res) {
  var info = decode(req.params.token);
  if (info.membership == "관리자") {
    User.find(function (err, users) {
      if (err) {
        return res.status(500).send({ error: 'database failure' });
      }
      res.json(users);
    }).sort({ name: 1 });
  }
  else {
    console.log(info);
    res.json({ result: false });
  }
});

/**
 * @swagger
 *  /users/{id}/{token}:
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
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 유저 정보를 json에 담음
 */
router.get('/:id/:token', function (req, res) {
  var info = decode(req.params.token);
  if (!info) {
    return res.json({ result: false });
  }
  User.findOne({ id: req.params.id }, function (err, user) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.json(user);
  })
});

/**
 * @swagger
 *  /users/overlap/id/{id}:
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
router.get('/overlap/id/:id', function (req, res) {
  User.findOne({ id: req.params.id }, function (err, user) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.json({ result: false });
    }
    res.json({ result: true });
  })
});

/**
 * @swagger
 *  /users/overlap/nickname/{nickname}:
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
router.get('/overlap/nickname/:nickname', function (req, res) {
  User.findOne({ nickname: req.params.nickname }, function (err, user) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.json({ result: false });
    }
    res.json({ result: true });
  })
});

/**
 * @swagger
 *  /users/login/{id}/{pwd}:
 *    get:
 *      tags:
 *      - User
 *      description: 로그인
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "아이디"
 *        required: true
 *        type: string
 *      - name: pwd
 *        in: path
 *        description: "비밀번호"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 로그인
 */
router.get('/login/:id/:pwd', function (req, res) {
  User.findOne({ id: req.params.id, pwd: req.params.pwd }, function (err, user) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.json(false);
    }
    var token = encode(user);
    console.log(user,token);
    res.json({
      token: token,
      nickname: user.nickname
    });
  });
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
 *              type: integer
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/', function (req, res) {
  var user = new User();
  user.name = req.body.name;
  user.id = req.body.id;
  user.pwd = req.body.pwd;
  user.nickname = req.body.nickname;
  user.region = req.body.region;
  user.year = req.body.year;
  user.membership = req.body.membership;

  console.log(req.body);

  user.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: false });
      return;
    }

    var super_tree = new Supertree();
    super_tree.id = req.body.id;
    super_tree.item = [];
  
    super_tree.save(function (err) {
      if(err){
        console.log(err);
        return;
      }    
    });

    res.json({ result: true });
  });
});


/**
 * @swagger
 *  /users:
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
 *            token:
 *              type: string
 *              required: true
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
 *              type: integer
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/', function (req, res) {
  var info = decode(req.params.token);
  if (!info) {
    return res.json({ result: false });
  }
  User.update({ id: req.body.id }, { $set: req.body }, function (err, output) {
    if (err) {
      res.status(500).json({ error: 'database failure' });
    }
    console.log(output);
    if (!output.n) {
      return res.json({ result: false });
    }
    res.json({ result: true });
  })
});




/**
 * @swagger
 *  /users:
 *    delete:
 *      tags:
 *      - User
 *      description: 유저 정보 삭제
 *      parameters:
 *      - in: body
 *        name: deleteUser
 *        description: "유저 정보 삭제"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.delete('/',function(req,res){
  var info = decode(req.body.token);
  if (!info) {
      return res.json({ result: false });
  }
  User.remove({ _id: req.body._id }, function (err, output) {
      if (err) {
        return res.status(500).json({ error: "database failure" });
      }
      console.log(output);
      res.json({ result: true });
    })
});

module.exports = router;
