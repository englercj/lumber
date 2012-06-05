/**
 * @license
 * text.js: Text Encoder
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
 * Text Encoder
 * @constructor
 * @implements {Encoder}
 */
var Text = exports.Text = function(options) {
    Encoder.call(this);

    this.name = 'text';
};

//////////
// Inherits from Encoder
///////////////////////////
util.inherits(Text, Encoder);

//////////
// Public Methods
///////////////////////////
/**
 * Encodes the passed string into CSV Text
 * @return {string} Encoded string
 * @param {string} str String to encode
 */
Text.prototype.encode = function(str) {
    return str;
};

//////////
// Private Methods
///////////////////////////
