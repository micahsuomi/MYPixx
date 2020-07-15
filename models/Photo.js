const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = Photo = mongoose.model('photo', photoSchema);