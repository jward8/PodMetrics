const { Schema, model } = require('mongoose');

const podcastSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    feed: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String,
        required: false
    }
});

module.exports = model('Podcast', podcastSchema);