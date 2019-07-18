var express = require('express');
var router = express.Router();
var Board = require('../models/board');

//모든 게시글 리스트를 반환
router.get('/all', function(req,res){
    var sort = {createdAt: -1};
    Board.find(function(err, boards){
        if(err) {
          return res.status(500).send({error: 'database failure'});
        }
        res.json(boards);
    }).sort(sort);
});

//게시글을 추가한다.
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

//게시글을 업데이트한다.
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

//조회수를 업데이트한다.
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
