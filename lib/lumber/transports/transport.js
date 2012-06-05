/**
 * @license
 * transport.js: Base Transport interface
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var events = require('events'),
util = require('util');

/**
 * Base Transport
 * @interface
 */
var Transport = exports.Transport = function(options) {
    events.EventEmitter.call(this);
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Transport, events.EventEmitter);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string via this transport, using
 *    the encoder specified
 * @param {string} str String to log
 * @param {string} level The level of this log
 */
Transport.prototype.log = function(str, level) {};