var express = require('express');
var router = express.Router();
var User = require('../models/user');
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
 *  /users/admin/{id}/{token}:
 *    get:
 *      tags:
 *      - User
 *      description: 관리자 아이디로 유저정보 반환.
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
 *        description: 관리자 정보를 반환
 */
router.get('/admin/:id/:token', function (req, res) {
  var info = decode(req.params.token);
  if (!info) {
    return res.json({ result: false, message: "유효하지 않은 토큰입니다" });
  }
  if (info.membership == "관리자") {
    User.findOne({ id: req.params.id }, function (err, user) {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
      res.json(user);
    })
  }
  else {
    res.json({ result: false, message: "권한이 없습니다" });
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
    console.log(user, token);
    res.json({
      token: token,
      nickname: user.nickname
    });
  });
});

/**
 * @swagger
 *  /users/department/{department}/position/{position}/{token}:
 *    get:
 *      tags:
 *      - User
 *      description: 부서 직책 정보를 통해 직원 반환
 *      parameters:
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      - name: department
 *        in: path
 *        description: "부서"
 *        required: true
 *        type: string
 *      - name: position
 *        in: path
 *        description: "직책"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 직원 반환
 */
router.get('/department/:department/position/:position/:token', function (req, res) {
  var info = decode(req.params.token);
  if (!info) {
    return res.json({ result: false });
  }
  User.find({ department: req.params.department , position: req.params.position }, function (err, users) {
    var nicknames = [];
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!users) {
      return res.json({result:false});
    }
    for (let index = 0; index < users.length; index++) {
      nicknames.push(users[index].nickname);
      if(index + 1 == users.length){
        res.json(nicknames);
      }
    }
  });
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
 *        description: 로그인
 */
router.post('/login', function (req, res) {
  User.findOne({ id: req.body.id, pwd: req.body.pwd }, function (err, user) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.json(false);
    }
    var token = encode(user);
    console.log(user, token);
    if(user.membership == "비회원"){
      res.json({result : "비회원"});
    }
    else{
      res.json({
        token: token,
        nickname: user.nickname
      });
    }
    
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
 *            department:
 *              type: string
 *            position:
 *              type: string
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/', function (req, res) {
  var user = new User();
  user.photo = "https://i.imgur.com/s5faoD6.png"
  user.name = req.body.name;
  user.id = req.body.id;
  user.pwd = req.body.pwd;
  user.nickname = req.body.nickname;
  user.department = req.body.department;
  user.position = req.body.position;
  user.membership = "비회원";

  console.log(req.body);

  user.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: false });
      return;
    }

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
 *            photo:
 *              type: string
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
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/', function (req, res) {
  var info = decode(req.body.token);
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
 *  /users/department:
 *    put:
 *      tags:
 *      - User
 *      description: 부서 변경
 *      parameters:
 *      - in: body
 *        name: updatedepartment
 *        description: "부서 변경"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            _id:
 *              type: string
 *              required: true
 *            department:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/department', function (req, res) {
  var info = decode(req.body.token);
  if (!info) {
    return res.json({ result: false });
  }
  if (info.membership == "관리자") {
    User.update({ _id: req.body._id }, { $set: { department: req.body.department } }, function (err, output) {
      if (err) {
        res.status(500).json({ error: 'database failure' });
      }
      console.log(output);
      if (!output.n) {
        return res.json({ result: false });
      }
      res.json({ result: true });
    })
  }
  else{
    res.json({result: false, message: "권한이 없습니다"})
    return;
  }
});

/**
 * @swagger
 *  /users/position:
 *    put:
 *      tags:
 *      - User
 *      description: 직책 변경
 *      parameters:
 *      - in: body
 *        name: updateposition
 *        description: "직책 변경"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            _id:
 *              type: string
 *              required: true
 *            position:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/position', function (req, res) {
  var info = decode(req.body.token);
  if (!info) {
    return res.json({ result: false });
  }
  if (info.membership == "관리자") {
    User.update({ _id: req.body._id }, { $set: { position: req.body.position } }, function (err, output) {
      if (err) {
        res.status(500).json({ error: 'database failure' });
      }
      console.log(output);
      if (!output.n) {
        return res.json({ result: false });
      }
      res.json({ result: true });
    })
  }
  else{
    res.json({result: false, message: "권한이 없습니다"})
    return;
  }
});


/**
 * @swagger
 *  /users/membership:
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
 *            _id:
 *              type: string
 *              required: true
 *            membership:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/membership', function (req, res) {
  var info = decode(req.body.token);
  if (!info) {
    return res.json({ result: false });
  }
  if (info.membership == "관리자") {
    User.update({ _id: req.body._id }, { $set: { membership: req.body.membership } }, function (err, output) {
      if (err) {
        res.status(500).json({ error: 'database failure' });
      }
      console.log(output);
      if (!output.n) {
        return res.json({ result: false });
      }
      res.json({ result: true });
    })
  }
  else{
    res.json({result: false, message: "권한이 없습니다"})
    return;
  }
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
router.delete('/', function (req, res) {
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
