const mongoose = require('mongoose');
var moment = require('moment');

const noticeSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true,
    },
    read : Array,
    unread : Array,
    createdAt:{
        type: String,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },   
});

module.exports = mongoose.model('Notice',noticeSchema);
