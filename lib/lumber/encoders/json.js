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
dateFormat = require('dateformat'),
common = require('../common'),
Encoder = require('./encoder').Encoder;

/**
 * JSON Encoder
 * @constructor
 * @implements {Encoder}
 */
var Json = exports.Json = function(options) {
    var self = this;

    Encoder.call(self);

    options = options || {};

    self.colorize = common.checkOption(options.colorize, false);
    self.timestamp = common.checkOption(options.timestamp, true);
    self.headFormat = common.checkOption(options.headFormat, '%L');
    self.dateFormat = common.checkOption(options.dateFormat, 'isoDateTime');

    self.contentType = 'application/json';
    self.encoding = 'utf8';
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
 * @param {string} level The level of this message
 * @param {string} msg The message to encode
 * @param {object} meta The metadata of this log
 */
Json.prototype.encode = function(level, msg, meta) {
    var self = this,
    head = self.headFormat.replace('%l', level.toLowerCase()).replace('%L', level.toUpperCase()),
    time = dateFormat(new Date(), self.dateFormat),
    obj = {
	level: level,
	head: head,
	message: msg
    };

    if(self.timestamp) obj.timestamp = time;
    if(meta) obj.meta = meta;

    return JSON.stringify(obj);
};