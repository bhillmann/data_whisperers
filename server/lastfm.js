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

var test = lastfm.request('user.getTopTracks', {
    user: 'bhillmann',
    handlers: {
        success: function(data) {
            var processed = _.map(data.toptracks.track, processData);
            console.log(processed);
        },
        error: function(error) {
            console.log("Error: " + error.message);
        }
    }
});

function processData(value, key) {
    var processed = {};
    processed.songName = value.name;
    processed.artist = value.artist.name;
    processed.dateLiked = "Feb. 21 2015";
    return processed;
};