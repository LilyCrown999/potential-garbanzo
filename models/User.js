const mongoose= require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type : String,
        Required : true
    },
    displayName: {
        type : String,
        Required : true
    },
    firstName: {
        type : String,
        Required : true
    },
    lastName: {
        type : String,
        Required : true
    },
    image: {
        type : String
    },
    createdAt: {
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)