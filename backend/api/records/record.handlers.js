
exports.addRecord = async (req, res) => {
    const {
        podName,
        episode,
        rating,
        platform
    } = req.body;
    try {
        await addRecord(podName, rating, platform)
        .then((data) => {
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}