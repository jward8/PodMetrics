const { Schema, model } = require('mongoose');

const recordSchema = new Schema({
    podcast: {
        type: String,
        required: true
    },
    episode: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        required: false
    },
    platform: {
        type: String,
        required: false
    },
});   

module.exports = model('Record', recordSchema);