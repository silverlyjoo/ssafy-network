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

    //res.send(chat);
});

//특정 방의 채팅정보를 가져온다.
router.get('/:room',function(req,res){
    var rule = {createdAt: 1};

    Chat.find({room: req.params.room}, function(err, chats){
        if(err){
          return res.status(500).json({error: err});
        } 
        if(!chats){
          return res.status(404).json({error: 'user not found'});
        } 
        res.json(chats);
    }).sort(rule);
});

module.exports = router;