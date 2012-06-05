/**
 * @license
 * json.js: JSON Encoder
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
 * JSON Encoder
 * @constructor
 * @implements {Encoder}
 */
var Json = exports.Json = function(options) {
    Encoder.call(this);

    this.name = 'json';
};

//////////
// Inherits from Encoder
///////////////////////////
util.inherits(Json, Encoder);

//////////
// Public Methods
///////////////////////////
/**
 * Encodes the passed string into JSON format
 * @return {string} Encoded string
 * @param {string} str String to encode
 */
Json.prototype.encode = function(str) {
    return JSON.stringify(str);
};

//////////
// Private Methods
///////////////////////////
