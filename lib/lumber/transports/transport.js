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
util = require('util'),
lumber = require('../../lumber');

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
 * @param {object} args The arguments for the log
 */
Transport.prototype.log = function(args) {};