#!/usr/bin/env node
'use strict';
var meow = require('meow');
var dataWhisperers = require('./');

var cli = meow({
  help: [
    'Usage',
    '  data-whisperers <input>',
    '',
    'Example',
    '  data-whisperers Unicorn'
  ].join('\n')
});

dataWhisperers(cli.input[0]);
