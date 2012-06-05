/**
 * @license
 * xml.js: JSON Encoder
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var util = require('util'),
common = require('../common'),
Encoder = require('./encoder').Encoder;

/**
 * XML Encoder
 * @constructor
 * @implements {Encoder}
 */
var Xml = exports.Xml = function(options) {
    Encoder.call(this);

    this.name = 'xml';
};

//////////
// Inherits from Encoder
///////////////////////////
util.inherits(Xml, Encoder);

//////////
// Public Methods
///////////////////////////
/**
 * Encodes the passed string into XML format
 * @return {string} Encoded string
 * @param {string} str String to encode
 */
Xml.prototype.encode = function(str) {
    return str;
};

//////////
// Private Methods
///////////////////////////
