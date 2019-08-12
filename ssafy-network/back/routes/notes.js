var express = require('express');
var router = express.Router();
var Note = require('../models/note');
var decode = require('../decode');

function dfs(notes, ItemTree, depth, parent) {
    for (let i = 0; i < notes.length; i++) {
        var road = notes[i].course.split(".");
        if (road.length == depth && notes[i].course.slice(0, notes[i].course.length - road[road.length-1].length) == parent) {
            if (notes[i].file == "txt") {
                ItemTree.push(notes[i]);
            }
            else {
                dfs(notes, notes[i].children, depth + 1, notes[i].course + ".");
                ItemTree.push(notes[i]);
            }
        }
    }

    ItemTree.sort((a, b) => {
        return a.file < b.file ? -1 : a.file > b.file ? 1 : 0;
    });
}

/**
 * @swagger
 *  /notes/txt/{_id}/{token}:
 *    get:
 *      tags:
 *      - Note
 *      description: 특정 파일 반환
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
 *        description:  특정 파일 반환
 */
router.get('/txt/:_id/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Note.findOne({ _id: req.params._id }, function (err, note) {
        if (err) {
            res.json({ result: false })
        }
        if(!note){
            res.json({result:false});
            return;
        }
        res.json(note);
    });
});

/**
 * @swagger
 *  /notes/{id}/{token}:
 *    get:
 *      tags:
 *      - Note
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
    Note.find({ id: req.params.id }, function (err, notes) {
        if (err) {
            res.json({ result: false })
        }
        dfs(notes, ItemTree, 2, "0.");

        console.log(ItemTree);

        res.json({
            item: ItemTree
        });
    });
});

/**
 * @swagger
 *  /notes/txt/{id}/{name}/{course}/{token}:
 *    get:
 *      tags:
 *      - Note
 *      description: 텍스트 파일 반환
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "아이디"
 *        required: true
 *        type: string
 *      - name: name
 *        in: path
 *        description: "파일명"
 *        required: true
 *        type: string
 *      - name: course
 *        in: path
 *        description: "경로"
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
router.get('/txt/:id/:name/:course/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Note.find({id: req.params.id, name: req.params.name, file: "txt"},function(err,notes){
        if(err){
            res.json({result: false});
            return;
        }
        for (let i = 0; i < notes.length; i++) {
            var road = notes[i].course.split(".");
            if(
                road.length - 1 == req.params.course.split(".").length && 
                notes[i].course.slice(0, notes[i].course.length - road[road.length-1].length - 1) == req.params.course
            ){
                res.json(notes[i]);
                return;
            }
        }
        res.json({result: false});
    });
    
});

/**
 * @swagger
 *  /notes/folder/{id}/{name}/{course}/{token}:
 *    get:
 *      tags:
 *      - Note
 *      description: 폴더 반환
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "아이디"
 *        required: true
 *        type: string
 *      - name: name
 *        in: path
 *        description: "파일명"
 *        required: true
 *        type: string
 *      - name: course
 *        in: path
 *        description: "경로"
 *        required: true
 *        type: string
 *      - name: token
 *        in: path
 *        description: "토큰"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 폴더 정보 반환
 */
router.get('/folder/:id/:name/:course/:token', function (req, res) {
    var info = decode(req.params.token);
    if (!info) {
        return res.json({ result: false });
    }
    Note.find({id: req.params.id, name: req.params.name, file: "folder"},function(err,notes){
        if(err){
            res.json({result: false});
            return;
        }
        for (let i = 0; i < notes.length; i++) {
            var road = notes[i].course.split(".");
            if(
                road.length - 1 == req.params.course.split(".").length && 
                notes[i].course.slice(0, notes[i].course.length - road[road.length-1].length - 1) == req.params.course
            ){
                res.json(notes[i]);
                return;
            }
        }
        res.json({result: false});
    });
    
});

/**
 * @swagger
 *  /notes/folder:
 *    post:
 *      tags:
 *      - Note
 *      description: 노트 트리 추가
 *      parameters:
 *      - in: body
 *        name: addNote
 *        description: "노트 트리 정보 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            id:
 *              type: string
 *              required: true
 *            name:
 *              type: string
 *              required: true
 *            course:
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
    var folder = new Note();
    folder.id = req.body.id;
    folder.course = req.body.course;
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
 *  /notes/txt:
 *    post:
 *      tags:
 *      - Note
 *      description: 노트 트리 추가
 *      parameters:
 *      - in: body
 *        name: addNote
 *        description: "노트 트리 정보 추가"
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              required: true
 *            id:
 *              type: string
 *              required: true
 *            course:
 *              type: string
 *              required: true
 *            name:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.post('/txt', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    var txt = new Note();
    txt.id = req.body.id;
    txt.course = req.body.course;
    txt.name = req.body.name;
    txt.file = "txt";
    txt.content = "";
    txt.editor = "markdown";
    txt.language = "";
    txt.source = "";

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
 *  /notes/txt:
 *    put:
 *      tags:
 *      - Note
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
 *            editor:
 *              type: string
 *            language:
 *              type: string
 *            source:
 *              type: string
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
    Note.update({ _id: req.body._id }, {
        $set: {
            name: req.body.name,
            content: req.body.content,
            editor: req.body.editor,
            language: req.body.language,
            source: req.body.source,
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
});

/**
 * @swagger
 *  /notes/folder:
 *    put:
 *      tags:
 *      - Note
 *      description: 폴더 업데이트
 *      parameters:
 *      - in: body
 *        name: updatefolder
 *        description: "폴더 정보 업데이트"
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
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.put('/folder', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    console.log(req.body);
    Note.update({ _id: req.body._id }, {
        $set: {
            name: req.body.name,
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
});

/**
 * @swagger
 *  /notes:
 *    delete:
 *      tags:
 *      - Note
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
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.delete('/', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    console.log(req.body._id);
    Note.remove({ _id: req.body._id }, function (err, output) {
        if (err) {
            return res.status(500).json({ error: "database failure" });
        }
        console.log(output);
        res.json({ result: true });
    });
});

/**
 * @swagger
 *  /notes/folder:
 *    delete:
 *      tags:
 *      - Note
 *      description: 폴더 아래 다 삭제
 *      parameters:
 *      - in: body
 *        name: deletefolder
 *        description: "폴더 아래 다 삭제"
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              required: true
 *            course:
 *              type: string
 *              required: true
 *            token:
 *              type: string
 *              required: true
 *      responses:
 *       200:
 *        description: "result = true 일 경우 정상적으로 작동"
 */
router.delete('/folder', function (req, res) {
    var info = decode(req.body.token);
    if (!info) {
        return res.json({ result: false });
    }
    console.log(req.body._id);
    Note.remove({ id: req.body.id , course :{ $regex: ".*"+req.body.course  } }, function (err, output) {
        if (err) {
            return res.status(500).json({ error: "database failure" });
        }
        console.log(output);
        res.json({ result: true });
    });
});
module.exports = router;