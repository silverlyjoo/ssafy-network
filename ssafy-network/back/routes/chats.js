var express = require('express');
var Chat = require('../models/chat');

var router = express.Router();

//어떤 방에서 어떤 유저가 채팅을 날리면 DB에 저장하고 다시 반송(date가 추가됨)
router.post('/', function(req,res){
    var chat = new Chat({
        room: req.body.room,
        user: req.body.user,
        chat: req.body.chat,
    });

    chat.save();

    res.send(chat);
});

module.exports = router;