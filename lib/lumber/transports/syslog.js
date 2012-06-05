/**
 * @license
 * syslog.js: Syslog transport
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var util = require('util'),
Transport = require('./transport').Transport;

/**
 * Syslog Transport
 * @implements {Transport}
 */
var Syslog = exports.Syslog = function(options) {
    Transport.call(this);

    this.name = 'syslog';
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Syslog, Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string to the syslog
 * @param {string} str String to log
 * @param {string} level The level of this log
 */
Syslog.prototype.log = function(str, level) {};