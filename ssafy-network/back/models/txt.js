const mongoose = require('mongoose');

const txtSchema = new mongoose.Schema({
    parent_id: String,
    name: String,
    file: String,
    content: String
});
module.exports = mongoose.model('Txt',txtSchema);
