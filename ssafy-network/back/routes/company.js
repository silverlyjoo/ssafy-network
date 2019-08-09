var Company = require('../models/company');
var express = require('express');
var router = express.Router();
var decode = require('../decode');

/**
 * @swagger
 *  /company/join/{department}:
 *    get:
 *      tags:
 *      - Company
 *      description: 회사 조직도 반환
 *      parameters:
 *      - name: department
 *        in: path
 *        description: "부서명"
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
router.get('/join/:department', function (req, res) {
    Company.findOne({ department: req.params.department },function (err, company) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        if(!company){
            res.json({result: false});
            return;
        }
        res.json(company);
    });
});

/**
 * @swagger
 *  /company/{token}:
 *    get:
 *      tags:
 *      - Company
 *      description: 회사 전체 조직도 반환
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
    Company.find(function (err, company) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        if(!company){
            res.json({result: false});
            return;
        }
        res.json(company);
    });
});

/**
 * @swagger
 *  /company/{_id}/{token}:
 *    get:
 *      tags:
 *      - Company
 *      description: 회사 조직도 반환
 *      parameters:
 *      - name: _id
 *        in: path
 *        description: "오브젝트 아이디"
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
router.get('/:_id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Company.findOne({ _id: req.params._id },function (err, company) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        if(!company){
            res.json({result: false});
            return;
        }
        res.json(company);
    });
});

/**
 * @swagger
 *  /company:
 *    post:
 *      tags:
 *      - Company
 *      description: 조직도 추가
 *      parameters:
 *      - in: body
 *        name: addCompany
 *        description: "조직도 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            department:
 *              type: string
 *              required: true
 *            parent:
 *              type: string
 *            children:
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
    var company = new Company();
    company.department = req.body.department;
    company.parent = req.body.parent;
    company.children = req.body.children;

    console.log(req.body);

    company.save(function (err) {
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
 *  /company:
 *    put:
 *      tags:
 *      - Company
 *      description: 부서 및 직급 수정
 *      parameters:
 *      - in: body
 *        name: updateCompany
 *        description: "부서 및 직급 수정"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            department:
 *              type: string
 *              required: true
 *            parent:
 *              type: string
 *            children:
 *              type: array
 *              items:
 *                  string
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    Company.update({ department: req.body.department }, { $set: { parent: req.body.parent,children: req.body.children } }, function (err, output) {
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
 *  /company:
 *    delete:
 *      tags:
 *      - Company
 *      description: 부서 삭제
 *      parameters:
 *      - in: body
 *        name: deleteCompany
 *        description: "부서 삭제"
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
        Company.remove({ _id: req.body._id }, function (err, output) {
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