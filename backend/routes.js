const podcastsRoutes = require('./api/podcast');
const express = require('express');
const router = express.Router();

router.get('/api/v1', (req, res) => {
    res.send('Hello World!') 
});

router.use('/api/v1/podcasts', podcastsRoutes);

module.exports = router;