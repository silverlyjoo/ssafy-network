const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    id: String,
    parent_id: String,
    name: String,
    children: Array,
    file: String
});
module.exports = mongoose.model('Tree',treeSchema);
