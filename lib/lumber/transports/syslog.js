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
lumber = require('../../lumber');

/**
 * Syslog Transport
 * @implements {Transport}
 */
var Syslog = exports.Syslog = function(options) {
    lumber.Transport.call(this);

    this.name = 'syslog';
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Syslog, lumber.Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string to the syslog
 * @param {string} str String to log
 * @param {string} level The level of this log
 */
Syslog.prototype.log = function(str, level) {};