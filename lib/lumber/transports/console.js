/**
 * @license
 * console.js: Console transport
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var util = require('util'),
Transport = require('./transport');

/**
 * Console Transport
 * @implements {Transport}
 */
var Console = exports.Console = function(options) {
    Transport.call(this);

    this.name = 'console';
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Console, Transport)

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string via the stdout console
 * @param {string} str String to log
 * @param {string} level The level of this log
 */
Console.prototype.log = function(str, level) {};