
const mongoose= require('mongoose');

const StorySchema = new mongoose.Schema({
    title: {
        type : String,
        Required : true,
        trim: true
    },
    body: {
        type : String,
        Required : true
    },
    status: {
        type : String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Story', StorySchema)