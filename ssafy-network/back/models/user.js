const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    id : {
        type: String,
        required: true,
    },
    pwd : {
        type: String,
        required: true,
    },
    nickname :  String,
    region : String,
    year : Number,
    membership :  Boolean,
});

module.exports = mongoose.model('User',userSchema);
