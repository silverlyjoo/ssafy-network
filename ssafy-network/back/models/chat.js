var mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    room:{
        type: String,
        required: true,
        ref: 'Room',
    },
    user:{
        type: String,
        required: true,
    },
    chat: String,
    gif: String,
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat',chatSchema);