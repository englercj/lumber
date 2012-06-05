/**
 * @license
 * file.js: File transport
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
 * File Transport
 * @implements {Transport}
 */
var File = exports.File = function(options) {
    Transport.call(this);

    this.name = 'file';
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(File, Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string to the specified file
 * @param {string} str String to log
 * @param {string} level The level of this log
 */
File.prototype.log = function(str, level) {};