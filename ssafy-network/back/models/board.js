const mongoose = require('mongoose');
var moment = require('moment');

const boardSchema = new mongoose.Schema({
    language: String,
    writer:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    source: String,
    content: String,
    hit: Number,
    createdAt:{
        type: String,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
});

module.exports = mongoose.model('Board',boardSchema);