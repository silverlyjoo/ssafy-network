const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    photo: String,
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
    department : String,
    position : String,
    membership :  String,
});

module.exports = mongoose.model('User',userSchema);
