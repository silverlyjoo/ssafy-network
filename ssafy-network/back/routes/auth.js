var express = require('express');
var router = express.Router();
var User = require('../models/user');
var encode = require('../encode');
var decode = require('../decode');

/**
 * @swagger
 *  /{token}:
 *    get:
 *      tags:
 *      - Authentication
 *      description: 토큰으로 유저 정보 반환
 *      parameters:
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 토큰으로 유저 정보 반환
 */
router.get('/:token', function(req, res){
  try{
    var info = decode(req.params.token);
    User.findOne({id: info.id}, function(err, user){
      if(err){
        return res.status(500).json({error: err});
      } 
      if(!user){
        return res.status(404).json({error: 'user not found'});
      } 
      res.json({
        name : user.name,
        id : user.id,
        nickname : user.nickname
      });
    });
  }
  catch (err){
    res.json({result: false});
  }
});



module.exports = router;
