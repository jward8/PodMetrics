const mongoose = require('mongoose');
const Record = require('./record.model');

exports.createRecord = async (req, res) => {
    const {
        podcast,
        episode,
        rating,
        platform
    } = req.body;
    try {
        const newRecord = new Record({
            podcast,
            episode,
            rating,
            platform
        });
        newRecord.save();
        res.status(200).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}