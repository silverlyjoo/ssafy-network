const mongoose = require('mongoose');

const supertreeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    item: Array
});
module.exports = mongoose.model('Supertree',supertreeSchema);
