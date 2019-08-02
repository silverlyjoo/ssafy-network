const mongoose = require('mongoose');
var moment = require('moment');

const noticeSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
    },
    writer: String,
    read : Array,
    unread : Array,
    createdAt:{
        type: String,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },   
});

module.exports = mongoose.model('Notice',noticeSchema);
