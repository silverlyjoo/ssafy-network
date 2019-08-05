var express = require('express');
var Notice = require('../models/notice');
var decode = require('../decode');
var router = express.Router();
var moment = require('moment');

/**
 * @swagger
 *  /notices/{token}:
 *    get:
 *      tags:
 *      - Notice
 *      description: 관리자용 알림 리스트 반환
 *      parameters:
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 관리자용 알림 리스트 반환 json
 */
router.get('/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    if( info.membership == "관리자"){
        Notice.find(function(err,notices){
            if(err){
                console.log(err);
                return;
            }
            res.json(notices);
        }).sort({createdAt:-1});
    }
    else{
        console.log("권한이 없습니다");
        res.json({result: false, message: "권한이 없습니다"});
    }
});

/**
 * @swagger
 *  /notices/{id}/{token}:
 *    get:
 *      tags:
 *      - Notice
 *      description: 회원용 알림 리스트 반환
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
 *        description: 회원용 알림 리스트 반환 json
 */
router.get('/:id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Notice.find({$or :[ { unread : req.params.id }, { read: req.params.id } ] },function(err, notices){
        if(err){
            console.log(err);
            return;
        }
        res.json(notices);
    }).sort({createdAt : -1});
});

/**
 * @swagger
 *  /notices:
 *    post:
 *      tags:
 *      - Notice
 *      description: 알림 추가
 *      parameters:
 *      - in: body
 *        name: addNotice
 *        description: "알림 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *              required: true
 *            content:
 *              type: string
 *              required: true
 *            writer:
 *              type: string
 *              required: true
 *            unread:
 *              type: array
 *              required: true
 *              items:
 *                  string
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    
    var notice = new Notice();
    notice.title = req.body.title;
    notice.content = req.body.content;
    notice.writer = req.body.writer;
    notice.read = [];
    notice.unread = req.body.unread;
    notice.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    notice.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        res.json({result: true});
    });
});
  
/**
 * @swagger
 *  /notices:
 *    put:
 *      tags:
 *      - Notice
 *      description: 알림 수정 (읽은 사람 ,안 읽은 사람)
 *      parameters:
 *      - in: body
 *        name: updateNotice
 *        description: "알림 정보 업데이트"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            _id:
 *              type: string
 *              required: true
 *            id:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
      return res.json({ result: false });
    }
    Notice.update({ _id: req.body._id }, { $pullAll: { unread: [req.body.id] }, $addToSet: { read: req.body.id } }, function (err, output) {
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
 *  /notices:
 *    delete:
 *      tags:
 *      - Notice
 *      description: 공지사항 삭제
 *      parameters:
 *      - in: body
 *        name: deleteNotice
 *        description: "공지사항 삭제"
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
        return res.json({ result: false, message: "유효하지 않은 토큰입니다" });
    }
    if( info.membership == "관리자"){
        Notice.remove({ _id: req.body._id }, function (err, output) {
            if (err) {
              return res.status(500).json({ error: "database failure" });
            }
            if(!output.n){
                return res.json({result : false});
            }
            console.log(output);
            res.json({ result: true });
          })
    }
    else{
        console.log("권한이 없습니다");
        res.json({result: false, message: "권한이 없습니다"});
    }
});


module.exports = router;
