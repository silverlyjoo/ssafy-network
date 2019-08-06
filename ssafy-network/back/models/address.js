const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true,
    },
    position: String,
    represent: String,
    telephone: String,
    cellphone: String,
    fax: String,
    content: String,
    bookmark:[],
});

module.exports = mongoose.model('Address',addressSchema);