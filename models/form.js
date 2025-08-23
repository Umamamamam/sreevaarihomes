const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema= new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Form',FormSchema);