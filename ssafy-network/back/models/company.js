const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    department : {
        type: String,
        required: true,
    },
    parent: String,
    children : Array,
});

module.exports = mongoose.model('Company',companySchema);
