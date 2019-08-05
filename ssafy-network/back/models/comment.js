const mongoose = require('mongoose');
var moment = require('moment');

const commentSchema = new mongoose.Schema({
    parent_id:{
        type: String,
        required: true,
    },
    writer:{
        type: String,
        required: true,
    },
    comment: String,
    createdAt:{
        type: String,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
});
module.exports = mongoose.model('Comment',commentSchema);
