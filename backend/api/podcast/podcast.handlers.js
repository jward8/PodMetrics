const { getAllPodcasts, addPodcast } = require('./podcast');
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