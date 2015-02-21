/**
 * Created by bhillmann on 21/02/15.
 */
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

var config = require('./config');

spotifyApi.setAccessToken(config.spotify);

api.get()