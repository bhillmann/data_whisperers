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

//CREATING FAKE DATA
var events = {"events":[
    {"name":"Plums", "location":"Plums","filter":["rap","rock"],"description":"Thursday night at Plums!","DJ":true}, 
    {"name":"Ben's House", "location":"Grand Ave.","filter":["country","folk","metal"],"description":"A killer time to be sure.","DJ":false} 
]}

var userLikes ={"userLikes":[
	{"songName":"Psychosocial", "artist":"Slipknot","dateLiked":"Jan. 15 2015"},
	{"songName":"Kyoto", "artist":"Yung Lean","dateLiked":"Jan. 14 2015"},
	{"songName":"America", "artist":"Simon & Garfunkel","dateLiked":"Dec. 3 2014"},
	{"songName":"Old Man", "artist":"Neil Young","dateLiked":"Nov. 15 2014"},
	{"songName":"The World's Greatest", "artist":"R. Kelly","dateLiked":"Nov. 10 2014"}
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


var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('leezy listening at http://%s:%s', host, port)
})