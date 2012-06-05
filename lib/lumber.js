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
lumber.Loggger = require('./lumber/logger').Logger;
lumber.Transport = require('./lumber/transports/transport').Transport;
lumber.Encoder = require('./lumber/encoders/encoder').Encoder;

//////////
// Expose defaults
///////////////////////////
lumber.config = require('./lumber/config');