var express = require('express');
var router = express.Router();
var Address = require('../models/address');
var decode = require('../decode');


/**
 * @swagger
 *  /addresses/{token}:
 *    get:
 *      tags:
 *      - Address
 *      description: 주소록 반환
 *      parameters:
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: trues
 *        type: string
 *      responses:
 *       200:
 *        description: 모든 게시글을 json 리스트에 반환
 */
router.get('/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Address.find(function (err, addresses) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(addresses);
    });
});

/**
 * @swagger
 *  /addresses/{id}/{token}:
 *    get:
 *      tags:
 *      - Address
 *      description: 주소록 반환
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "아이디"
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
router.get('/:id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Address.find({ bookmark: req.params.id }, function (err, addresses) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.json(addresses);
    });
});

/**
 * @swagger
 *  /addresses:
 *    post:
 *      tags:
 *      - Address
 *      description: 주소록 추가
 *      parameters:
 *      - in: body
 *        name: addAddress
 *        description: "주소록 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            company:
 *              type: string
 *              required: true
 *            position:
 *              type: string
 *            represent:
 *              type: string
 *            telephone:
 *              type: string
 *            writer:
 *              type: string
 *            fax:
 *              type: string
 *            content:
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
    var address = new Address();
    address.company = req.body.company;
    address.position = req.body.position;
    address.represent = req.body.represent;
    address.telephone = req.body.telephone;
    address.writer = req.body.writer;
    address.fax = req.body.fax;
    address.content = req.body.content;
    address.bookmark = [];

    console.log(req.body);

    address.save(function (err) {
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
 *  /addresses/bookmark:
 *    put:
 *      tags:
 *      - Address
 *      description: 주소록 즐겨찾기
 *      parameters:
 *      - in: body
 *        name: updateAddress
 *        description: "주소록 즐겨찾기"
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
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/bookmark', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    Address.update({ _id: req.body._id }, { $addToSet: { bookmark: req.body.id } }, function (err, output) {
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
 *  /addresses/cancel:
 *    put:
 *      tags:
 *      - Address
 *      description: 주소록 즐겨찾기 해제
 *      parameters:
 *      - in: body
 *        name: updateAddress
 *        description: "주소록 즐겨찾기 해제"
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
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/cancel', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    Address.update({ _id: req.body._id }, { $pullAll: { bookmark: [req.body.id] } }, function (err, output) {
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
 *  /addresses:
 *    put:
 *      tags:
 *      - Address
 *      description: 주소록 수정
 *      parameters:
 *      - in: body
 *        name: updateAddress
 *        description: "주소록 수정"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            company:
 *              type: string
 *              required: true
 *            position:
 *              type: string
 *            represent:
 *              type: string
 *            telephone:
 *              type: string
 *            writer:
 *              type: string
 *            fax:
 *              type: string
 *            content:
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
    if (info.membership == "관리자" || info.nickname == req.body.writer) {
        Address.update({ _id: req.body._id }, {
            $set: {
                company: req.body.company,
                position: req.body.position,
                represent: req.body.represent,
                telephone: req.body.telephone,
                fax: req.body.fax,
            }
        }, function (err, output) {
            if (err) {
                res.status(500).json({ error: 'database failure' });
            }
            console.log(output);
            if (!output.n) {
                return res.json({ result: false });
            }
            res.json({ result: true });
        })
    }
    else {
        res.json({ result: false, message: "권한이 없습니다" });
        return;
    }
});

/**
 * @swagger
 *  /addresses:
 *    delete:
 *      tags:
 *      - Address
 *      description: 주소록 삭제
 *      parameters:
 *      - in: body
 *        name: deleteAddress
 *        description: "주소록 삭제"
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
router.delete('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    if (info.membership == "관리자") {
        Address.remove({ _id: req.body._id }, function (err, output) {
            if (err) {
                return res.status(500).json({ error: "database failure" });
            }
            console.log(output);
            res.json({ result: true });
        })
    }
    else {
        res.json({ result: false, message: "권한이 없습니다" });
        return;
    }
});

module.exports = router;