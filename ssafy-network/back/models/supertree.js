const mongoose = require('mongoose');

const supertreeSchema = new mongoose.Schema({
    id: String,
    item: Array
});
module.exports = mongoose.model('Supertree',supertreeSchema);
