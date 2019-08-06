var express = require('express');
var router = express.Router();
var Mail = require('../models/mail');
var decode = require('../decode');
var moment = require('moment');

/**
 * @swagger
 *  /mails/{nickname}/{token}:
 *    get:
 *      tags:
 *      - Mail
 *      description: 메일 반환
 *      parameters:
 *      - name: nickname
 *        in: path
 *        description: "닉네임"
 *        required: trues
 *        type: string
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: trues
 *        type: string
 *      responses:
 *       200:
 *        description: 모든 게시글을 json 리스트에 반환
 */
router.get('/:nickname/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Mail.find({ receive: req.params.nickname }, function (err, mails) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(mails);
    }).sort({createdAt: -1});
});


/**
 * @swagger
 *  /mails:
 *    post:
 *      tags:
 *      - Mail
 *      description: 메일 쓰기
 *      parameters:
 *      - in: body
 *        name: writeMail
 *        description: "메일 쓰기"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            writer:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *            content:
 *              type: string
 *            receive:
 *              type: array
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
    var mail = new Mail();
    mail.writer = req.body.writer;
    mail.title = req.body.title;
    mail.content = req.body.content;
    mail.receive = req.body.receive;
    mail.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    console.log(req.body);

    mail.save(function (err) {
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
 *  /mails:
 *    put:
 *      tags:
 *      - Mail
 *      description: 메일 삭제
 *      parameters:
 *      - in: body
 *        name: deleteMail
 *        description: "메일 삭제"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            nickname:
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
    Mail.update({ _id: req.body._id }, { $pullAll: { receive: [req.body.nickname] } }, function (err, output) {
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

module.exports = router;