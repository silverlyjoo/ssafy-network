var express = require('express');
var router = express.Router();
var Board = require('../models/board');

/**
 * @swagger
 *  /boards/all:
 *    get:
 *      tags:
 *      - Board
 *      description: 모든 게시글 반환
 *      responses:
 *       200:
 *        description: 게시글 정보를 json 리스트에 담음
 */
router.get('/all', function(req,res){
    var sort = {createdAt: -1};
    Board.find(function(err, boards){
        if(err) {
          return res.status(500).send({error: 'database failure'});
        }
        res.json(boards);
    }).sort(sort);
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
 *            code:
 *              type: string
 *            writer:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *              required: true
 *            content:
 *              type: string
 *            hit:
 *              type: integer
 *      responses:
 *       200:
 *        description: "result = 1 일 경우 정상적으로 작동"
 */
router.post('/', function(req, res){
    var board = new Board();
    board.code = req.body.code;
    board.writer = req.body.writer;
    board.title = req.body.title;
    board.content = req.body.content;
    board.hit = req.body.hit;
  
    console.log(req.body);
  
    board.save(function(err){
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
 *  /boards/_id:
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
 *            code:
 *              type: string
 *            writer:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *              required: true
 *            content:
 *              type: string
 *            hit:
 *              type: integer
 *      responses:
 *       200:
 *        description: result = 1 일 경우 정상적으로 작동
 */
router.put('/_id', function(req, res){
    Board.update({ _id: req.body._id }, { $set: req.body }, function(err, output){
        if(err){
          res.status(500).json({ error: 'database failure' });
        }
        console.log(output);
        if(!output.n){
          return res.status(404).json({ error: 'board not found' });
        } 
        res.json({result: 1});
    })
});

/**
 * @swagger
 *  /boards/{_id}:
 *    put:
 *      tags:
 *      - Board
 *      description: 게시글 조회수 업데이트
 *      parameters:
 *      - name: _id
 *        in: path
 *        description: "오브젝트 아이디"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 조회수 +1
 */
router.put('/:_id', function(req, res){
    Board.findOne({_id: req.params._id}, function(err,board){
        Board.update({ _id: req.params._id }, { $set: { hit: board.hit + 1 }}, function(err, output){
            if(err){
              res.status(500).json({ error: 'database failure' });
            }
            console.log(output);
            if(!output.n){
              return res.status(404).json({ error: 'board not found' });
            } 
            res.json({result: 1});
        })
    });
});

module.exports = router;
