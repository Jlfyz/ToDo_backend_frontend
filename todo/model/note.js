const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        min: 6,
    },
    title: {
        type: String,
        required: true,
        min: 6
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Note', noteSchema);