var express = require('express');
var Comment = require('../models/comment');
var router = express.Router();
var decode = require('../decode');
var moment = require('moment');

/**
 * @swagger
 *  /comments/{parent_id}/{token}:
 *    get:
 *      tags:
 *      - Comment
 *      description: 게시글의 댓글 반환
 *      parameters:
 *      - name: parent_id
 *        in: path
 *        description: "게시글의 오브젝트 아이디"
 *        required: trues
 *        type: string
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: trues
 *        type: string
 *      responses:
 *       200:
 *        description: 모든 게시글을 json 리스트에 반환
 */
router.get('/:parent_id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Comment.find({ parent_id: req.params.parent_id },function (err, comments) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        
        res.json(comments);
    }).sort({createdAt: 1});
});
  

/**
 * @swagger
 *  /comments:
 *    post:
 *      tags:
 *      - Comment
 *      description: 댓글 추가
 *      parameters:
 *      - in: body
 *        name: addComment
 *        description: "댓글 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            parent_id:
 *              type: string
 *              required: true
 *            writer:
 *              type: string
 *              required: true
 *            comment:
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
    var comment = new Comment();
    comment.parent_id = req.body.parent_id;
    comment.writer = req.body.writer;
    comment.comment = req.body.comment;
    comment.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(req.body);

    comment.save(function (err) {
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
 *  /comments:
 *    put:
 *      tags:
 *      - Comment
 *      description: 댓글 수정
 *      parameters:
 *      - in: body
 *        name: updateComment
 *        description: "댓글 수정"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            comment:
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
    Comment.update({ _id: req.body._id}, { $set: {
            comment: req.body.comment,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
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
 *  /comments:
 *    delete:
 *      tags:
 *      - Comment
 *      description: 댓글 삭제
 *      parameters:
 *      - in: body
 *        name: deleteComment
 *        description: "댓글 삭제"
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
    Comment.remove({ _id: req.body._id }, function (err, output) {
        if (err) {
          return res.status(500).json({ error: "database failure" });
        }
        console.log(output);
        res.json({ result: true });
      })
});


module.exports = router;