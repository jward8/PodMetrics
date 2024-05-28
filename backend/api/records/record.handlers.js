const { createRecord, getRecords, getAllRecords } = require("./record");

exports.addRecord = async (req, res) => {
    const {
        podcast,
        episode,
        rating,
        platform,
        dateListened
    } = req.body;
    try {
        await createRecord(podcast, episode, rating, platform, dateListened)
        .then((data) => {
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRecords = async (req, res) => {
    try {
        if (Object.keys(req.query).length > 0) {
            const { podcastId } = req.query;
            await getRecords(podcastId)
            .then((data) => {
                res.status(200).json(data);
            });
        } else {
            await getAllRecords()
            .then((data) => {
                res.status(200).json(data);
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}