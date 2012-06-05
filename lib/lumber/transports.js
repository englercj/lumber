/**
 * @license
 * transports.js: Include for core transports
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

var transports = exports;

//////////
// Required Includes
///////////////////////////
var fs = require('fs'),
path = require('path'),
common = require('./common');

//////////
// Setup getters for transports
///////////////////////////
fs.readdirSync(path.join(__dirname, 'transports')).forEach(function(file) {
    //ignore non-js files, and base class
    if(file.match(/\.js$/) === null || file == 'transport.js') return;

    var t = file.replace('.js', ''),
    name = common.titleCase(t);

    //ignore base class
    transports.__defineGetter__(name, function() {
	return require('./transports/' + t)[name];
    });
});
