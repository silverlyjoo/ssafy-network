const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    file : {
        type: String,
        required: true,
    },
    course : {
        type: String,
        required: true,
    },
    content: String,
    language: String,
    editor: String,
    source: String,
    children: Array,
    
});

module.exports = mongoose.model('Note',noteSchema);
