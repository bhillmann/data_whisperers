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

lastfm.js;

//CREATING FAKE DATA
var events = {"events":[
    {"name":"Plums", "location":"Plums","filter":["rap","rock"],"description":"Thursday night at Plums!","DJ":true, "isCurrentEvent":true}, 
    {"name":"Ben's House", "location":"Grand Ave.","filter":["country","folk","metal"],"description":"A killer time to be sure.","DJ":false, "isCurrentEvent":false} 
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
	{"songName":"Can I Kick it?", "artist":"A Tribe Called Quest","isCurrentSong":false,"isNextSong":false}
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

app.get('/getUserLikes', function (req, res, next){
	res.send(userLikes);
})

app.get('/displayCurrentEvent', function (req, res, next){
	res.send(getCurrEventAndCurrSong);
})

//this takes in the data from the create event page.  
//have front end say that it's the current event
app.post('/postEvent', function (req, res, next){
	//step 1: update the events object
	for(var i=0;i<events.events.length;i++){
		var current = events.events[i];
		if(current.isCurrentEvent){
			current.isCurrentEvent=false;
		}
	}
	//then add the event from req to events
	var jsonEvent = {};
	events.events.push(jsonEvent);

	//send the req back
	res.send(req);
})

app.get('/getPoolOfSongs', function (req, res, next){
	res.send(songs);
})

function getCurrEventAndCurrSong(){
	var currEvent = "";
	var currSong = "";
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
			currSong=current.songName + " by " + current.artist;
		}
	}
	return({"currentEvent":currEvent, "currentSong":currSong});
}


var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(lastFMSongs);
  console.log('leezy listening at http://%s:%s', host, port);

})