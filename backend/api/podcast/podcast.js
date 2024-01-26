const mongoose = require('mongoose');
const Podcast = require('../models/Podcast');
let Parser = require('rss-parser');
const fs = require('fs');

exports.getAllPodcasts = async (req, res) => {   
    try {
        const data = await Podcast.find();
        return {data: data};
    } catch (err) {
        console.log(err);
    }
}

exports.addPodcast = async (podName, feed) => {
    try {
        console.log({
            podName,
            feed
        })
        let parser = new Parser();
        let rss = await parser.parseURL(feed);
        const newPodcast = new Podcast({
            title: podName,
            feed: feed,
            image: rss.image.url
        });
        newPodcast.save();
        return {list: newPodcast};
    } catch (err) {
        console.log(err);
    }
}

exports.getPodcastEpisodes = async (podcastId) => {
    try {
        let episodes = [];
        let parser = new Parser();
        const data = await Podcast.findById(podcastId);
        let rss = await parser.parseURL(data.feed);
        let id = 0;
        for(let item of rss.items) {
            if (item.itunes.duration.includes(':')) {
                episodes.push({
                    id: id++,
                    title: item.title,
                    duration: item.itunes.duration,
                });
            } else {
                var date = new Date(null);
                date.setSeconds(item.itunes.duration);
                episodes.push({
                    id: id++,
                    title: item.title,
                    duration: date.toISOString().substr(11, 8),
                });
            }
        }
        return {episodes: episodes};
    } catch (err) {
        console.log(err);
    }
}