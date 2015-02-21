/**
 * Created by bhillmann on 21/02/15.
 */

var LastFmNode = require('lastfm').LastFmNode;
var _ = require('underscore');
var fs = require('fs');
// So dumb
var ewait = require("ewait");
var all = new ewait.WaitForAll({
    event: 'success'    // Wait for a custom event.
});
var config = require('./config');

var lastfm = new LastFmNode({
    api_key: config.lastfm,    // sign-up for a key at http://www.last.fm/api
    secret: 'secret'
});

function getProcessed() {
    return lastfm.request('user.getTopTracks', {
        user: "bhillmann"
    });

    //ee.on('success', function(data) {
    //    var p = _.map(data.toptracks.track, processData);
    //    fs.writeFile('./lastfm.json', JSON.stringify(p));
    //});
    //ee.on('error', function(data) {
    //});
}

function processData(value, key) {
    var processed = {};
    processed.songName = value.name;
    processed.artist = value.artist.name;
    processed.dateLiked = "Feb. 21 2015";
    return processed;
}

getProcessed();

exports.getProcessed = getProcessed;
exports.processData = processData;