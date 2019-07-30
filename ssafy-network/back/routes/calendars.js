var express = require('express');
var router = express.Router();
var Calendar = require('../models/calendar');
var decode = require('../decode');

/**
 * @swagger
 *  /calendars/{id}/{token}:
 *    get:
 *      tags:
 *      - Calendar
 *      description: 모든 일정 반환
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
 *        description: 모든 일정을 json 리스트에 반환
 */
router.get('/:id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Calendar.find({ id: req.params.id } , function (err, calendars) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(calendars);
    });
});

/**
 * @swagger
 *  /calendars:
 *    post:
 *      tags:
 *      - Calendar
 *      description: 캘린더 추가
 *      parameters:
 *      - in: body
 *        name: addCalendar
 *        description: "캘린더 정보 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            id:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *              required: true
 *            start:
 *              type: string
 *              required: true
 *            end:
 *              type: string
 *            cssClass:
 *              type: string
 *            desc:
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
    var calendar = new Calendar();
    calendar.id = req.body.id;
    calendar.title = req.body.title;
    calendar.start = req.body.start;
    calendar.end = req.body.end;
    calendar.cssClass = req.body.cssClass;
    calendar.desc = req.body.desc;

    console.log(req.body);

    calendar.save(function (err) {
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
 *  /calendars:
 *    put:
 *      tags:
 *      - Calendar
 *      description: 캘린더 업데이트
 *      parameters:
 *      - in: body
 *        name: updateCalendar
 *        description: "캘린더 정보 업데이트"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            id:
 *              type: string
 *              required: true
 *            title:
 *              type: string
 *              required: true
 *            start:
 *              type: string
 *              required: true
 *            end:
 *              type: string
 *            cssClass:
 *              type: string
 *            desc:
 *              type: string
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    Calendar.update({ _id: req.body._id, id: req.body.id }, { $set: {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            cssClass: req.body.cssClass,
            desc: req.body.desc
        }}, function (err, output) {
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
 *  /calendars:
 *    delete:
 *      tags:
 *      - Calendar
 *      description: 캘린더 정보 삭제
 *      parameters:
 *      - in: body
 *        name: deleteCalendar
 *        description: "캘린더 삭제"
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
    Calendar.remove({ _id: req.body._id }, function (err, output) {
        if (err) {
          return res.status(500).json({ error: "database failure" });
        }
        console.log(output);
        res.json({ result: true });
      })
});

module.exports = router;