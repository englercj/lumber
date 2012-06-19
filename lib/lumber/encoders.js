/**
 * @license
 * encoders.js: Include for core encoders
 *
 * (c) 2012 Panther Development
 * MIT LICENCE
 *
 **/

var encoders = exports;

//////////
// Required Includes
///////////////////////////
var fs = require('fs'),
path = require('path'),
common = require('./common');

//////////
// Setup getters for encoders
///////////////////////////
fs.readdirSync(path.join(__dirname, 'encoders')).forEach(function(file) {
    //ignore non-js files, and base class
    if(file.match(/\.js$/) === null || file == 'encoder.js') return;

    var e = file.replace('.js', ''),
    name = common.titleCase(e);

    //ignore base class
    encoders.__defineGetter__(name, function() {
	return require('./encoders/' + e)[name];
    });
});
