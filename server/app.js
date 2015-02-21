// /*global describe, it */
// 'use strict';
// var assert = require('assert');
// var dataWhisperers = require('../');

// describe('data-whisperers node module', function () {
//   it('must have at least one test', function () {
//     dataWhisperers();
//     assert(false, 'I was too lazy to write any tests. Shame on me.');
//   });
// });

//GETTING REAL DATA
/**
 * Created by bhillmann on 21/02/15.
 */
var lastfm = require("./lastfm.js");
var _ = require("underscore");

//below code gets the user's top songs and adds them to the songs array

//END GETTING REAL DATA

//CREATING FAKE DATA
var events = {"events":[
    {"name":"Plums", "location":"Plums","filter":["rap","rock"],"description":"Thursday night at Plums!","DJ":true, "isCurrentEvent":true, "startTime":"12:00 am"}, 
    {"name":"Ben's House", "location":"Grand Ave.","filter":["country","folk","metal"],"description":"A killer time to be sure.","DJ":false, "isCurrentEvent":false, "startTime":"11 pm"} 
]}

var userLikes ={"userLikes":[
	{"songName":"Psychosocial", "artist":"Slipknot","dateLiked":"Jan. 15 2015"},
	{"songName":"Kyoto", "artist":"Yung Lean","dateLiked":"Jan. 14 2015"},
	{"songName":"America", "artist":"Simon & Garfunkel","dateLiked":"Dec. 3 2014"},
	{"songName":"Old Man", "artist":"Neil Young","dateLiked":"Nov. 15 2014"},
	{"songName":"The World's Greatest", "artist":"R. Kelly","dateLiked":"Nov. 10 2014"}
]}

var songs ={"songs":[
	{"songName":"Dark Horse", "artist":"Katy Perry", "isCurrentSong":false, "isNextSong":true},
	{"songName":"Don't Trip", "artist":"Vitamin P","isCurrentSong":false,"isNextSong":false},
	{"songName":"Blank Space", "artist":"Taylor Swift","isCurrentSong":true,"isNextSong":false},
	{"songName":"SexyBack", "artist":"Justin Timberlake","isCurrentSong":false,"isNextSong":false},
	{"songName":"Can I Kick it?", "artist":"A Tribe Called Quest","isCurrentSong":false,"isNextSong":false},
	{"songName":"Mom's Spaghetti", "artist":"Eminem","isCurrentSong":false,"isNextSong":false},
	{"songName":"Rocket Man", "artist":"Elton John","isCurrentSong":false,"isNextSong":false},
	{"songName":"Forever Young", "artist":"Jay Z","isCurrentSong":false,"isNextSong":false},
	{"songName":"Scooby and the Gang", "artist":"Those Meddling Kids","isCurrentSong":false,"isNextSong":false},
	{"songName":"Thundercats", "artist":"Lavender Gooms","isCurrentSong":false,"isNextSong":false},

]}


var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));
// Tell Express that we also want to parse json bodies from put or post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//automatically create route for everything in public
//this makes sure to grab all the files index.html depends on, aka everything in www
app.use(express.static(path.join(__dirname, '../front/www')));  

//this is the request that starts the app I think
app.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../front/www', 'index.html'))
})

app.get('/getEvents', function (req, res, next){
	res.send(events);
})

app.get('/x', function (req, res, next){
	res.send(userLikes);
})

app.get('/bhillmann', function(req, res, next) {
    var ee = lastfm.getProcessed();
    ee.once('success', function(data) {
        res.send(_.map(data.toptracks.track, lastfm.processData));
    });
    ee.once('error', function(data) {
        console.log(data);
    });
})

app.get('/displayCurrentEvent', function (req, res, next){
	res.send(getCurrEventAndCurrSongAndNextSong());
})

//this takes in the data from the create event page.  
//have front end say that it's the current event
app.post('/postEvent', function (req, res, next){
	//step 1: update the events object
	// for(var i=0;i<events.events.length;i++){
	// 	var current = events.events[i];
	// 	if(current.isCurrentEvent){
	// 		current.isCurrentEvent=false;
	// 	}
	// }
	// //then add the event from req to events
	// console.log(req);
	// var jsonEvent = {};
	// events.events.push(jsonEvent);
	//TODO: add this new event to events
	console.log(req);



	//send the req back
	var newRes = req;
	res.send(req.body);
})

app.get('/getPoolOfSongs', function (req, res, next){
	res.send(songs);
})

function getCurrEventAndCurrSongAndNextSong(){
	var currEvent = "";
	var currSong = "";
	var nextSong = "";
	console.log(events.events.length);
	console.log(events.events);
	console.log(songs.songs);
	//loop through events to get current event
	for(var i=0;i<events.events.length;i++){
		var current = events.events[i];
		if(current.isCurrentEvent){
			currEvent=current.name;
		}
	}
	//loop through songs to get current song
	for(var j=0;j<songs.songs.length;j++){
		var current = songs.songs[j];
		if(current.isCurrentSong){
			currSong={
				title: current.songName,
				artist: current.artist
			};
		}
		if(current.isNextSong){
			nextSong={
				title: current.songName,
				artist: current.artist
			};
		}
	}
	return({"currentEvent":currEvent, "currentSong":currSong, "nextSong":nextSong});
}

function updateSongs(retrievedSongs){
	for(var i =0;i<retrievedSongs.length;i++){
		songs.songs.push(retrievedSongs[i]);
	}
}

//updateSongs(lastFMSongs);

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('leezy listening at http://%s:%s', host, port);
  console.log("LOGGING REAL Songs");
  //console.log(lastFMSongs);
  //console.log(songs);
})