/**
 * transports.js: Include for core transports
 *
 * (c) 2012 Panther Development
 * MIT LICENCE
 *
 **/

var transports = exports;

//////////
// Required Includes
///////////////////////////
var fs = require('fs'),
path = require('path'),
common = require('./common');

//////////
// Grab transports
///////////////////////////
fs.readdirSync(path.join(__dirname, 'transports')).forEach(function(file) {
    if(file.match())
    var t = file.replace('.js', ''),
    