var express = require('express');
var router = express.Router();
var Tree = require('../models/tree');
var decode = require('../decode');

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
    tree.items = req.body.items;

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

module.exports = router;