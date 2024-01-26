const mongoose = require('mongoose');
const Record = require('../models/Record');

exports.createRecord = async (podcast, episode, rating, platform) => {
    try {
        let title = episode.title;
        let duration = episode.duration;
        const newRecord = new Record({
            podcast,
            title,
            duration,
            rating,
            platform
        });
        newRecord.save();
        return {record: newRecord};
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}