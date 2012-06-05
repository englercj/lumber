/**
 * @license
 * webservice.js: Webservice transport
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
 * Webservice Transport
 * @implements {Transport}
 */
var Webservice = exports.Webservice = function(options) {
    Transport.call(this);

    this.name = 'webservice';
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Webservice, Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string to the specified webservice
 * @param {string} str String to log
 * @param {string} level The level of this log
 */
Webservice.prototype.log = function(str, level) {};