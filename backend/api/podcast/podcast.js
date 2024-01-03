const mongoose = require('mongoose');
const Podcast = require('../models/Podcast');
let Parser = require('rss-parser');

exports.getAllPodcasts = async (req, res) => {   
    try {
        const data = await Podcast.find();
        return {list: data};
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