const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    code: String,
    writer:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    content: String,
    hit: Number,
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Board',boardSchema);