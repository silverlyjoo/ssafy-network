var mongoose = require('mongoose');
var moment = require('moment');

const roomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    max:{
        type: Number,
        required: true,
        defaultValue: 10,
        min: 2,
    },
    owner:{
        type: String,
        required: true,
    },
    password: String,
    createdAt:{
        type: String,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    userList: Array,
});

module.exports = mongoose.model('Room',roomSchema);