var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var boardsRouter = require('./routes/boards');
var commentsRouter = require('./routes/comments');
var calendarsRouter = require('./routes/calendars');
var searchRouter = require('./routes/search');
var noticesRouter = require('./routes/notices');
var addressesRouter = require('./routes/addresses');
var mailRouter = require('./routes/mails');
var notesRouter = require('./routes/notes');
var companyRouter = require('./routes/company');

var app = express();
var db = require('./db');
var swagger = require('./swagger');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

db();
app.use(swagger);

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/boards', boardsRouter);
app.use('/comments', commentsRouter);
app.use('/calendars', calendarsRouter);
app.use('/notices', noticesRouter);
app.use('/search', searchRouter);
app.use('/addresses', addressesRouter);
app.use('/mails', mailRouter);
app.use('/notes', notesRouter);
app.use('/company', companyRouter);

module.exports = app;
