const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    start : {
        type: String,
        required: true,
    },
    end : String,
    cssClass : String,
    desc : String,
});

module.exports = mongoose.model('Calendar',calendarSchema);
