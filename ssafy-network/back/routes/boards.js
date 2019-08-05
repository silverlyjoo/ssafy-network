var express = require('express');
var router = express.Router();
var Board = require('../models/board');
var decode = require('../decode');
var moment = require('moment');

/**
 * @swagger
 *  /boards/{token}:
 *    get:
 *      tags:
 *      - Board
 *      description: 모든 게시글 반환
 *      parameters:
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: trues
 *        type: string
 *      responses:
 *       200:
 *        description: 모든 게시글을 json 리스트에 반환
 */
router.get('/:token', function (req, res) {
  var info = decode(req.params.token);
  if (!info) {
      return res.json({ result: false });
  }
  Board.find(function (err, boards) {
      if (err) {
          return res.status(500).send({ error: 'database failure' });
      }
      res.json(boards);
  }).sort({createdAt:-1});
});

/**
 * @swagger
 *  /boards:
 *    post:
 *      tags:
 *      - Board
 *      description: 게시글 추가
 *      parameters:
 *      - in: body
 *        name: addBoard
 *        description: "게시글 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            language:
 *              type: string
 *            writer:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *              required: true
 *            source:
 *              type: string
 *            content:
 *              type: string
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/', function (req, res) {
  var info = decode(req.body.token);
  if (!info) {
      return res.json({ result: false });
  }
  var board = new Board();
  board.language = req.body.language;
  board.writer = req.body.writer;
  board.title = req.body.title;
  board.source = req.body.source;
  board.content = req.body.content;
  board.hit = 0;
  board.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

  console.log(req.body);

  board.save(function (err) {
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
 *  /boards:
 *    put:
 *      tags:
 *      - Board
 *      description: 게시글 업데이트
 *      parameters:
 *      - in: body
 *        name: updateBoard
 *        description: "게시글 정보 업데이트"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            language:
 *              type: string
 *            title:
 *              type: string
 *              required: true
 *            source:
 *              type: string
 *            content:
 *              type: string
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/', function (req, res) {
  var info = decode(req.body.token);
  if (!info) {
      return res.json({ result: false });
  }
  Board.update({ _id: req.body._id}, { $set: {
        language: req.body.language,
        title: req.body.title,
        source: req.body.source,
        content: req.body.content
      }}, function (err, output) {
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
 *  /boards/hit:
 *    put:
 *      tags:
 *      - Board
 *      description: 게시글 조회수 업데이트
 *      parameters:
 *      - in: body
 *        name: updateHit
 *        description: "게시글 조회수 업데이트"
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
router.put('/hit', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    Board.update({_id: req.body._id}, {$inc:{hit:1}}, function (err, output) {
        if (err) {
            res.status(500).json({ error: 'database failure' });
        }
        console.log(output);
        if (!output.n) {
            return res.json({ result: false });
        }
        res.json({ result: true });
    });
});
/**
 * @swagger
 *  /boards:
 *    delete:
 *      tags:
 *      - Board
 *      description: 게시글 삭제
 *      parameters:
 *      - in: body
 *        name: deleteBoard
 *        description: "게시글 삭제"
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
  Board.remove({ _id: req.body._id }, function (err, output) {
      if (err) {
        return res.status(500).json({ error: "database failure" });
      }
      console.log(output);
      res.json({ result: true });
    })
});

module.exports = router;
