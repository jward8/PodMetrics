const podcastsRoutes = require('./api/podcast');
const recordsRoutes = require('./api/records');
const express = require('express');
const router = express.Router();

router.get('/api/v1', (req, res) => {
    res.send('Hello World!') 
});

router.use('/api/v1/podcasts', podcastsRoutes);
router.use('/api/v1/records', recordsRoutes);

module.exports = router;