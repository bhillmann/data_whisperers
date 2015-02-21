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
    {"name":"Plums", "location":"Plums","filter":["rap","rock"],"description":"Thursday night at Plums!","DJ":true, "isCurrentEvent":true, "startTime":"12:00 am", "imageURL":"plums.jpg"}, 
    {"name":"Ben's House", "location":"Grand Ave.","filter":["country","folk","metal"],"description":"A killer time to be sure.","DJ":false, "isCurrentEvent":false, "startTime":"11 pm", "imageURL":"ben_hilly.jpg"} 
]}

var userLikes ={"userLikes":[
	{"title":"Psychosocial", "artist":"Slipknot","dateLiked":"Jan. 15 2015"},
	{"title":"Kyoto", "artist":"Yung Lean","dateLiked":"Jan. 14 2015"},
	{"title":"America", "artist":"Simon & Garfunkel","dateLiked":"Dec. 3 2014"},
	{"title":"Old Man", "artist":"Neil Young","dateLiked":"Nov. 15 2014"},
	{"title":"The World's Greatest", "artist":"R. Kelly","dateLiked":"Nov. 10 2014"}
]}

var songs ={"songs":[
	{"title":"Dark Horse", "artist":"Katy Perry", "isCurrentSong":false, "isNextSong":true, "imageURL":"img/DarkHorseCover.png"},
	{"title":"Don't Trip", "artist":"Vitamin P","isCurrentSong":false,"isNextSong":false, "imageURL":"img/vitaminP.jpg"},
	{"title":"Blank Space", "artist":"Taylor Swift","isCurrentSong":true,"isNextSong":false, "imageURL":"img/Blank_Space.png"},
	{"title":"SexyBack", "artist":"Justin Timberlake","isCurrentSong":false,"isNextSong":false, "imageURL":"img/SexyBack.jpg"},
	{"title":"Can I Kick it?", "artist":"A Tribe Called Quest","isCurrentSong":false,"isNextSong":false, "imageURL":"img/tribe.jpg"},
	{"title":"Mom's Spaghetti", "artist":"Eminem","isCurrentSong":false,"isNextSong":false, "imageURL":"img/spaghetti.jpg"},
	{"title":"Rocket Man", "artist":"Elton John","isCurrentSong":false,"isNextSong":false, "imageURL":"img/rocketManElton.jpg"},
	{"title":"Forever Young", "artist":"Jay Z","isCurrentSong":false,"isNextSong":false, "imageURL":"img/jayz_cover_young.jpg"},
	{"title":"Scooby and the Gang", "artist":"Those Meddling Kids","isCurrentSong":false,"isNextSong":false, "imageURL":"img/scooby.jpg"},
	{"title":"Thundercats", "artist":"Lavender Gooms","isCurrentSong":false,"isNextSong":false, "imageURL":"img/thundercats.jpg"},

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

// app.get('/getPoolOfSongs', function(req, res, next) {
//     var ee = lastfm.getProcessed();
//     ee.once('success', function(data) {
//     	var processedPulledSongs = _.map(data.toptracks.track, lastfm.processData);
//     	var currentSongsLength = songs.songs.length;
//     	for(var i =0;i<processedPulledSongs.length;i++){
//     		processedPulledSongs[i].isCurrentSong=false;
//     		processedPulledSongs[i].isNextSong=false;
//     		songs.songs.push(processedPulledSongs[i]);
//     		//songs.songs[i+currentSongsLength] = processedPulledSongs[i];
//     	}
//     	//now songs is updated.  Randomly select 10 of them
//     	//create array same size as songs with integers in ascending order
//     	var ints = [];
//     	for(var j=0;j<20;j++){
//     		ints[j]=j;
//     	}
//     	var shuffledInts = shuffle(ints);
//     	var pickedSongs=[];
//     	for(var k=0;k<10;k++){
//     		pickedSongs[k]=songs.songs[shuffledInts[k]];
//     	}
//     	res.send(pickedSongs);
//     	// //res.send(processedPulledSongs);

//     	//res.send(shuffledInts);

//     });
//     ee.once('error', function(data) {
//         console.log(data);
//     });
// })

app.get('/getPoolOfSongs', function(req, res, next) {
    var ee = lastfm.getProcessed();
    ee.once('success', function(data) {
    	var processedPulledSongs = _.map(data.toptracks.track, lastfm.processData);
    	var currentSongsLength = songs.songs.length;
    	for(var i =0;i<processedPulledSongs.length;i++){
    		processedPulledSongs[i].isCurrentSong=false;
    		processedPulledSongs[i].isNextSong=false;
    		//Staring at the Sun by The Offspring
    		if(i==0){
    			processedPulledSongs[i].imageURL = "img/original_pranksters.jpg";
    		}
    		//Introduction to destruction by sum41
    		else if(i==1){
    			processedPulledSongs[i].imageURL = "img/intro_to_destruction.jpg";
    		}
    		//Sugar by Maroon 5
    		else if(i==2){
    			processedPulledSongs[i].imageURL = "img/Maroon-5-Sugar.jpg";
    		}
    		//Superwoman by Alicia Keys
    		else if(i==3){
    			processedPulledSongs[i].imageURL = "img/as_i_am.jpg";
    		}
    		//Go Ahead by Alicia Keys
    		else if(i==4){
    			processedPulledSongs[i].imageURL = "img/as_i_am.jpg";
    		}
    		//As I am (Intro ) by Alicia Keys
    		else if(i==5){
    			processedPulledSongs[i].imageURL = "img/as_i_am.jpg";
    		}
    		//energy by drake
    		else if(i==6){
    			processedPulledSongs[i].imageURL = "img/energy_drake.jpg";
    		}
    		//thinking out loud by Ed Sheeran
    		else if(i==7){
    			processedPulledSongs[i].imageURL = "img/ed-sheeran-thinking-out-loud-thumb.jpg";
    		}
    		//uptown Funk by Mark Ronson
    		else if(i==8){
    			processedPulledSongs[i].imageURL = "img/ronson_uptown.jpg";
    		}
    		//earned it "the weeknd"
    		else if(i==9){
    			processedPulledSongs[i].imageURL = "img/weeknd_earned_it.jpg";
    		}
    		songs.songs.push(processedPulledSongs[i]);
    	}
    	//now songs is updated.  Randomly select 10 of them
    	//create array same size as songs with integers in ascending order
    	var ints = [];
    	for(var j=0;j<20;j++){
    		ints[j]=j;
    	}
    	var shuffledInts = shuffle(ints);
    	var pickedSongs=[];
    	for(var k=0;k<10;k++){
    		pickedSongs[k]=songs.songs[shuffledInts[k]];
    	}
    	res.send(pickedSongs);
    	//res.send(processedPulledSongs);

    	//res.send(shuffledInts);

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
	for(var i=0;i<events.events.length;i++){
		var current = events.events[i];
		if(current.isCurrentEvent){
			current.isCurrentEvent=false;
		}
	}
	//then add the event from req to events
	console.log(req);
	var jsonEvent = {};
	events.events.push(jsonEvent);
	//TODO: add this new event to events
	console.log(req);



	//we are just sending the request back
	res.send(req.body);
})

// app.get('/getPoolOfSongs', function (req, res, next){
// 	res.send(songs);
// })

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
				title: current.title,
				artist: current.artist
			};
		}
		if(current.isNextSong){
			nextSong={
				title: current.title,
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

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('leezy listening at http://%s:%s', host, port);
  console.log("LOGGING REAL Songs");
})

//UTILITY FUNCTIONS
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function shuffle2(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}