const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
    },
    item : {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('Tree',treeSchema);
