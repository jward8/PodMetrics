const { Schema, model } = require('mongoose');

const recordSchema = new Schema({
    podcast: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'podcasts'
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: false
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
    dateListened: {
        type: Date,
        required: false
    }
});   

module.exports = model('Record', recordSchema);