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

exports.getPodcastEpisodes = async (feed) => {
    let parser = new Parser();
        let podcastList = [];

        for (let podcast of data) {
            let episodes = [];
            let rss = await parser.parseURL(podcast.feed);
            for (let episode of rss.items) {
                episodes.push({
                    title: episode.title,
                    link: episode.link,
                    pubDate: episode.pubDate
                });
            }
            podcastList.push({
                ...podcast._doc,
                episodes: episodes
            });
        }
    }