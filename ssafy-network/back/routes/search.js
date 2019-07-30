var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Room = require('../models/room');
var decode = require('../decode');

/**
 * @swagger
 *  /search/users/{method}/{value}/{token}:
 *    get:
 *      tags:
 *      - Search
 *      description: 특정값으로 유저 검색
 *      parameters:
 *      - name: method
 *        in: path
 *        description: "방법"
 *        required: true
 *        type: string
 *      - name: value
 *        in: path
 *        description: "값"
 *        required: true
 *        type: string
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 특정값으로 유저 검색
 */
router.get('/users/:method/:value/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
      return res.json({ result: false });
    }
    switch(req.params.method){
        case "id":
            User.find({id: { $regex: '.*' + req.params.value + '.*' } },function(err,users){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!users) {
                    console.log("검색된 유저가 없습니다");
                    return res.json({result: false});
                }
                res.json(users);
                });
            break;
        case "name":
            User.find({name: { $regex: '.*' + req.params.value + '.*' } },function(err,users){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!users) {
                    console.log("검색된 유저가 없습니다");
                    return res.json({result: false});
                }
                res.json(users);
                });
            break;
        case "nickname":
            User.find({nickname: { $regex: '.*' + req.params.value + '.*' } },function(err,users){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!users) {
                    console.log("검색된 유저가 없습니다");
                    return res.json({result: false});
                }
                res.json(users);
                });
            break;
        case "membership":
            User.find({membership: req.params.value  },function(err,users){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!users) {
                    console.log("검색된 유저가 없습니다");
                    return res.json({result: false});
                }
                res.json(users);
                });
            break;
        case "region":
            User.find({region: req.params.value },function(err,users){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!users) {
                    console.log("검색된 유저가 없습니다");
                    return res.json({result: false});
                }
                res.json(users);
                });
            break;
        case "year":
            User.find({year:  req.params.value  },function(err,users){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!users) {
                    console.log("검색된 유저가 없습니다");
                    return res.json({result: false});
                }
                res.json(users);
                });
            break;
    }
});

/**
 * @swagger
 *  /search/rooms/{method}/{value}/{token}:
 *    get:
 *      tags:
 *      - Search
 *      description: 특정값으로 채팅방 검색
 *      parameters:
 *      - name: method
 *        in: path
 *        description: "방법"
 *        required: true
 *        type: string
 *      - name: value
 *        in: path
 *        description: "값"
 *        required: true
 *        type: string
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 특정값으로 채팅방 검색
 */
router.get('/rooms/:method/:value/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
      return res.json({ result: false });
    }
    switch(req.params.method){
        case "title":
            Room.find({title: { $regex: '.*' + req.params.value + '.*' } },function(err,rooms){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!rooms) {
                    console.log("검색된 채팅방이 없습니다");
                    return res.json({result: false});
                }
                res.json(rooms);
            });
            break;
        case "max":
            Room.find({max: { $gt:req.params.value } },function(err,rooms){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!rooms) {
                    console.log("검색된 채팅방이 없습니다");
                    return res.json({result: false});
                }
                res.json(rooms);
            });
            break;
        case "owner":
            Room.find({owner: { $regex: '.*' + req.params.value + '.*' } },function(err,rooms){
                if (err) {
                    return res.status(500).json({ result: false });
                }
                if (!rooms) {
                    console.log("검색된 채팅방이 없습니다");
                    return res.json({result: false});
                }
                res.json(rooms);
            });
            break;
    }
});

module.exports = router;
