var mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    room:{
        type: String,
        required: true,
        ref: 'Room',
    },
    name:{
        type: String,
        required: true,
    },
    msg: String,
    gif: String,
    time: String
});

module.exports = mongoose.model('Chat',chatSchema);