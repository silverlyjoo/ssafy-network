var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var decode = require('../decode');

/**
 * @swagger
 *  /rooms/{token}:
 *    get:
 *      tags:
 *      - Room
 *      description: 모든 채팅방 리스트 반환
 *      parameters:
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 채팅방 정보를 json 리스트에 담음
 */
router.get('/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Room.find(function (err, rooms) {
    if (err) {
        return res.status(500).send({ error: 'database failure' });
    }
    res.json(rooms);
    }).sort({ title: 1 });
});
  
/**
 * @swagger
 *  /rooms:
 *    post:
 *      tags:
 *      - Room
 *      description: 채팅방 추가
 *      parameters:
 *      - in: body
 *        name: createRoom
 *        description: "채팅방 만들기"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *              required: true
 *            max:
 *              type: integer
 *              required: true
 *            owner:
 *              type: string
 *              required: true
 *            password:
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

    var room = new Room();
    room.title = req.body.title;
    room.max = req.body.max;
    room.owner = req.body.owner;
    room.password = req.body.password;
  
    console.log(req.body);
  
    room.save(function (err) {
      if (err) {
        return res.json({ result: false });
      }
      res.json({ result: true });
    });
});
  
  /**
 * @swagger
 *  /rooms:
 *    delete:
 *      tags:
 *      - Room
 *      description: 채팅방 삭제
 *      parameters:
 *      - in: body
 *        name: deleteRoom
 *        description: "채팅방 삭제"
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
    Room.remove({ _id: req.body._id }, function (err, output) {
        if (err) {
          return res.status(500).json({ error: "database failure" });
        }
        console.log(output);
        res.json({ result: true });
      })
});

module.exports = router;
