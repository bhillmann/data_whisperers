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

var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));
// Tell Express that we also want to parse json bodies from put or post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));  //automatically create route for everything in public


var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('leezy listening at http://%s:%s', host, port)

})