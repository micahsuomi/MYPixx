const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    registeredAt: {
        type: Date,
        default: Date.now


    },
    bio: String,
    avatar: String,

    photos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'photo',
        }
    ]
    
});

module.exports = User = mongoose.model('user', userSchema);