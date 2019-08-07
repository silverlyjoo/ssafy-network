const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true,
    },
    position: String,
    represent: String,
    telephone: String,
    fax: String,
    content: String,
    bookmark:[],
    writer: String,
});

module.exports = mongoose.model('Address',addressSchema);