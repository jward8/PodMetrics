const { getAllPodcasts, addPodcast, getPodcastEpisodes } = require('./podcast');
exports.getPodcasts = async (req, res) => {
    try {
        await getAllPodcasts()
        .then((data) => {
            res.status(200).json(data);
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addPodcast = async (req, res) => {
    const {
        podName,
        feed
    } = req.body;
    try {
        await addPodcast(podName, feed)
        .then((data) => {
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getPodcastEpisodes = async (req, res) => {
    const podcastId = req.query.podcastId;
    try {
        await getPodcastEpisodes(podcastId)
        .then((data) => {
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}