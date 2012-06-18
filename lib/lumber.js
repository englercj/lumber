/**
 * @license
 * lumber.js: Include for lumber
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

var lumber = exports;

//////////
// Required Includes
///////////////////////////

//////////
// Expose pkginfo
///////////////////////////
require('pkginfo')(module, 'version');

//////////
// Include logging transports
///////////////////////////
lumber.transports = require('./lumber/transports');

//////////
// Include logging transports
///////////////////////////
lumber.encoders = require('./lumber/encoders');

//////////
// Expose utilities
///////////////////////////
lumber.util = require('./lumber/common');

//////////
// Expose core
///////////////////////////
lumber.Logger = require('./lumber/logger').Logger;
lumber.Transport = require('./lumber/transports/transport').Transport;
lumber.Encoder = require('./lumber/encoders/encoder').Encoder;

//////////
// Expose defaults
///////////////////////////
lumber.defaults = {
    levels: {
	silent: -1,
	error: 0,
	warn: 1,
	info: 2,
	verbose: 3,
	debug: 4,
	silly: 5
    },
    colors: {
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	verbose: 'magenta',
	debug: 'green',
	silly: 'grey'
    }
};