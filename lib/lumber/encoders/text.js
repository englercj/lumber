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
dateFormat = require('dateformat'),
eyes = require('eyes'),
common = require('../common'),
Encoder = require('./encoder').Encoder;

/**
 * Text Encoder
 * @constructor
 * @implements {Encoder}
 */
var Text = exports.Text = function(options) {
    var self = this;

    Encoder.call(self);
    options = options || {};

    self.colorize = options.colorize || true;
    self.timestamp = options.timestamp || false;
    self.headFormat = options.headFormat || '%l: ';
    self.dateFormat = options.dateFormat || 'isoDateTime';

    self.inspect = eyes.inspector({ stream: null });

    self.contentType = 'text/plain';
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
 * @param {string} level The level of this message
 * @param {string} msg The message to encode
 * @param {object} meta The metadata of this log
 */
Text.prototype.encode = function(level, msg, meta) {
    var self = this,
    head = self.headFormat.replace('%l', level.toLowerCase()).replace('%L', level.toUpperCase()),
    time = dateFormat(new Date(), self.dateFormat);

    return head + (self.timestamp ? '(' + time + ') ' : '') + msg + (meta ? '\n' + self.inspect(meta) : '');
};