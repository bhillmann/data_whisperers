/**
 * Created by bhillmann on 21/02/15.
 */

var LastFmNode = require('lastfm').LastFmNode;
var _ = require('underscore');

var config = require('./config');

var lastfm = new LastFmNode({
    api_key: config.lastfm,    // sign-up for a key at http://www.last.fm/api
    secret: 'secret'
});

function getProcessed() {
    return lastfm.request('user.getTopTracks', {
            user: 'bhillmann'
    });
}

function processData(value, key) {
    var processed = {};
    processed.songName = value.name;
    processed.artist = value.artist.name;
    processed.dateLiked = "Feb. 21 2015";
    return processed;
}

exports.getProcessed = getProcessed;
exports.processData = processData;