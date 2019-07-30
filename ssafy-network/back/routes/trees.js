var express = require('express');
var router = express.Router();
var Supertree = require('../models/supertree');
var Txt = require('../models/txt');
var Folder = require('../models/folder'); 
var decode = require('../decode');


async function dfs(p_id,ItemTree){
    Folder.find({parent_id: p_id} , async function(err, folder){
        Txt.find({parent_id: p_id}, function(err, txt){
            for (let i = 0; i < txt.length; i++) {
                ItemTree.push(txt[i]);
            }
        });
        for (let i = 0; i < folder.length; i++) {
            dfs(folder[i]._id,folder[i].children);
            ItemTree.push(folder[i]);
        }
    });
    ItemTree.sort(function(a, b){
        return a.file < b.file ? -1 : a.file > b.file ? 1 : 0;
    });
}


/**
 * @swagger
 *  /trees/{id}/{token}:
 *    get:
 *      tags:
 *      - Tree
 *      description: 아이디가 가지고 있는 노트 트리 반환
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
 *        description: 모든 트리를 json 으로 반환 item 은 배열
 */
router.get('/:id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    var ItemTree = [];
    Supertree.findOne({id: req.params.id} ,async function(err, tree){
        if(err){
            res.json({result: false})
        }
        dfs(tree._id,ItemTree);

        setTimeout(function() {
            console.log(ItemTree);
            
            res.json({
                item: ItemTree
            });
        }, 2000);
    });
});

/**
 * @swagger
 *  /trees/txt/{_id}/{token}:
 *    get:
 *      tags:
 *      - Tree
 *      description: 텍스트 파일 반환
 *      parameters:
 *      - name: _id
 *        in: path
 *        description: "오브젝트 아이디"
 *        required: true
 *        type: string
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 텍스트 파일 정보 반환
 */
router.get('/txt/:_id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Txt.findOne({_id: req.params._id} , function(err, txt){
        if(err){
            res.json({result: false})
            return;
        }
        console.log(txt);
        res.json(txt);
    });
});

/**
 * @swagger
 *  /trees/txt/{parent_id}/{name}/{token}:
 *    get:
 *      tags:
 *      - Tree
 *      description: 텍스트 파일 반환
 *      parameters:
 *      - name: parent_id
 *        in: path
 *        description: "상위 폴더 오브젝트 아이디"
 *        required: true
 *        type: string
 *      - name: name
 *        in: path
 *        description: "파일명"
 *        required: true
 *        type: string
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 텍스트 파일 정보 반환
 */
router.get('/txt/:parent_id/:name/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Txt.findOne({parent_id: req.params.parent_id, name: req.params.name},function(err,txt){
        if(err){
            res.json({result: false});
            return;
        }
        if(!txt){
            return res.json({result: false});
        }
        console.log(txt);
        res.json(txt);
    });
    
});

/**
 * @swagger
 *  /trees/folder:
 *    post:
 *      tags:
 *      - Tree
 *      description: 노트 트리 추가
 *      parameters:
 *      - in: body
 *        name: addTree
 *        description: "노트 트리 정보 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            parent_id:
 *              type: string
 *              required: true
 *            name:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/folder', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    var folder = new Folder();
    folder.parent_id = req.body.parent_id;
    folder.name = req.body.name;
    folder.file = "folder";
    folder.children = [];

    console.log(req.body);

    folder.save(function (err) {
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
 *  /trees/txt:
 *    post:
 *      tags:
 *      - Tree
 *      description: 노트 트리 추가
 *      parameters:
 *      - in: body
 *        name: addTree
 *        description: "노트 트리 정보 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            parent_id:
 *              type: string
 *              required: true
 *            name:
 *              type: string
 *              required: true
 *            content:
 *              type: string
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/txt', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    var txt = new Txt();
    txt.parent_id = req.body.parent_id;
    txt.name = req.body.name;
    txt.file = "txt";
    txt.content = "";

    console.log(req.body);

    txt.save(function (err) {
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
 *  /trees/txt:
 *    put:
 *      tags:
 *      - Tree
 *      description: 파일 업데이트
 *      parameters:
 *      - in: body
 *        name: updatetxt
 *        description: "파일 정보 업데이트"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            name:
 *              type: string
 *              required: true
 *            content:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/txt', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    console.log(req.body);
    Txt.update({ _id: req.body._id }, { $set: {
            name: req.body.name,
            content: req.body.content,
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
 *  /trees:
 *    delete:
 *      tags:
 *      - Tree
 *      description: 노트 트리 파일 삭제
 *      parameters:
 *      - in: body
 *        name: deletefile
 *        description: "노트 트리 파일 삭제"
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *            file:
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
    console.log(req.body._id);
    if(req.body.file == "folder"){
        Folder.remove({ _id: req.body._id }, function (err, output) {
            if (err) {
              return res.status(500).json({ error: "database failure" });
            }
            console.log(output);
            res.json({ result: true });
        });
    }
    if(req.body.file == "txt"){
        Txt.remove({ _id: req.body._id }, function (err, output) {
            if (err) {
              return res.status(500).json({ error: "database failure" });
            }
            console.log(output);
            res.json({ result: true });
        });
    }
});


module.exports = router;