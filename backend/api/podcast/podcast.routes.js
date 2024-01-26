const express = require('express');
const podcastsRoutes = express.Router();
const podcastHandlers = require('./podcast.handlers');

podcastsRoutes.get('/', podcastHandlers.getPodcasts);
podcastsRoutes.post('/', podcastHandlers.addPodcast);
podcastsRoutes.get('/episodes', podcastHandlers.getPodcastEpisodes);
module.exports = podcastsRoutes;