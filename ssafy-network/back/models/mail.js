const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    writer:{
        type: String,
        required: true,
    },
    title: String,
    content: String,
    receive:[],
    createdAt: String,
});

module.exports = mongoose.model('Mail',mailSchema);