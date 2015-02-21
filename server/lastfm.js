/**
 * Created by bhillmann on 21/02/15.
 */
var LastFmNode = require('lastfm').LastFmNode;

var lastfm = new LastFmNode({
    api_key: '9d693d889eb0898357d4121f009e5ef9',    // sign-up for a key at http://www.last.fm/api
    secret: 'secret'
});

var test = lastfm.request('user.getTopTracks', {
    user: 'bhillmann',
    handlers: {
        success: processData,
        error: function(error) {
            console.log("Error: " + error.message);
        }
    }
});

function processData(data) {
    for (trackName in data.toptracks.track) {
        console.log(data.toptracks.track[trackName]);
        
    }
};