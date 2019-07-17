var express = require('express');
var Room = require('../models/room');

var router = express.Router();

//render 의 형태는 views 에 있는 pug와 연동되는 것으로 전부 고쳐야함
router.get('/', async(req, res, next) =>{
    try{
      var rooms = await Room.find({});
      res.render('main', {rooms, title:'Gif 채팅방',error: req.flash('roomError')});
    }
    catch(error){
      console.error(error);
      next(error);
    }
});
  
router.get('/create', (req,res) =>{
    res.render('room', {title: 'GIF 채팅방 생성'});
});

router.post('/create',async(req, res, next) =>{
    try{
        var room = new Room({
            title: req.body.title,
            max: req.body.max,
            owner: req.body.owner,
            password: req.body.password,
        });
        var newRoom = await room.save();
        var io = req.app.get('io');
        io.of('/room').emit('newRoom',newRoom);
        res.redirect('/room/${newRoom._id}?password=${req.body.password}');
    }
    catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;
