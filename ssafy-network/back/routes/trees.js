var express = require('express');
var router = express.Router();
var Tree = require('../models/tree');
var decode = require('../decode');

/**
 * @swagger
 *  /trees/{id}/{token}:
 *    get:
 *      tags:
 *      - Tree
 *      description: 아이디가 가지고 있는 노트 트리 반환
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
 *        description: 모든 트리를 json 으로 반환 item 은 배열
 */
router.get('/:id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Tree.find({ id: req.params.id } , function (err, trees) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(trees);
    });
});

/**
 * @swagger
 *  /trees:
 *    post:
 *      tags:
 *      - Tree
 *      description: 노트 트리 추가
 *      parameters:
 *      - in: body
 *        name: addTree
 *        description: "노트 트리 정보 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            id:
 *              type: string
 *              required: true
 *            item:
 *              type: array
 *              items:
 *                  type: object
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    var tree = new Tree();
    tree.id = req.body.id;
    tree.item = req.body.item;

    console.log(req.body);

    tree.save(function (err) {
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
 *  /trees:
 *    put:
 *      tags:
 *      - Tree
 *      description: 노트 트리 업데이트
 *      parameters:
 *      - in: body
 *        name: updateTree
 *        description: "노트 트리 정보 업데이트"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            id:
 *              type: string
 *              required: true
 *            item:
 *              type: array
 *              items:
 *                  type: object
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    Tree.update({ _id: req.body._id, id: req.body.id }, { $set: { item: req.body.item } }, function (err, output) {
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
 *  /trees:
 *    delete:
 *      tags:
 *      - Tree
 *      description: 노트 트리 정보 삭제
 *      parameters:
 *      - in: body
 *        name: updateTree
 *        description: "노트 트리 정보 업데이트"
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
    Tree.remove({ _id: req.body._id }, function (err, output) {
        if (err) {
          return res.status(500).json({ error: "database failure" });
        }
        console.log(output);
        res.json({ result: true });
      })
});

module.exports = router;