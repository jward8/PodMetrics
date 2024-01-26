const { createRecord } = require("./record");

exports.addRecord = async (req, res) => {
    const {
        podcast,
        episode,
        rating,
        platform
    } = req.body;
    try {
        await createRecord(podcast, episode, rating, platform)
        .then((data) => {
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}