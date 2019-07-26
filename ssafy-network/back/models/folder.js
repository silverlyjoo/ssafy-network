const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    parent_id: String,
    name: String,
    children: Array,
    file: String
});
module.exports = mongoose.model('Folder',folderSchema);
