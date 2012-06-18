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
 * @param {string} str String to log
 * @param {string} level The level of this log
 */
Transport.prototype.log = function(str, level) {};

//////////
// Private Methods
///////////////////////////
/**
 * Instantiates an encoder if current settings is a string
 */
Transport.prototype._setupEncoder = function() {
    if(typeof(self.encoder) == 'string') {
	var e = lumber.util.titleCase(self.encoder);
	
        if(lumber.encoders[e]) {
            self.encoder = new lumber.encoders[e]();
        } else {
            throw new Error('Unknown encoder passed: ' + self.encoder);
        }
    }
};