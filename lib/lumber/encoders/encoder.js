/**
 * @license
 * encoder.js: Base Encoder interface
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
 * Base Encoder
 * @interface
 */
var Encoder = exports.Encoder = function(options) {
    events.EventEmitter.call(this);
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Encoder, events.EventEmitter);

//////////
// Public Methods
///////////////////////////
/**
 * Encodes the passed string into the format
 *    implemented by this encoder
 * @return {string} Encoded string
 * @param {string} str String to encode
 */
Encoder.prototype.encode = function(str) {
    return str;
};