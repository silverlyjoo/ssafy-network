const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : String,
    id : String,
    pwd : String,
    nickname : String,
    region : String,
    year : Number,
    membership : Boolean
});

module.exports = mongoose.model('User',userSchema);
