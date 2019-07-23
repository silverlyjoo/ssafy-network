var swaggerUi = require('swagger-ui-express');
var swaggereJsdoc = require('swagger-jsdoc');
var express = require('express');

const router = express.Router();

const options = {
//swagger문서 설정
    swaggerDefinition: {
        info: {
            title: 'SSAFY Network API',
            version: '3.0.0',
            description: 'SSAFY Network API with express',
        },
        host: '192.168.31.55:3000',
        basePath: '/'
    },
//swagger api가 존재하는 곳 입니다.
    apis: ['./routes/*.js']
};

const specs = swaggereJsdoc(options);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;