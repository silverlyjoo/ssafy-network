var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var chatsRouter = require('./routes/chats');
var boardsRouter = require('./routes/boards');
var calendarsRouter = require('./routes/calendars');

var app = express();
var db = require('./db');
var swagger = require('./swagger');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

db();
app.use(swagger);

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/chats', chatsRouter);
app.use('/boards', boardsRouter);
app.use('/calendars', calendarsRouter);

module.exports = app;
