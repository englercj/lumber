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
dateFormat = require('dateformat'),
common = require('../common'),
Encoder = require('./encoder').Encoder;

/**
 * XML Encoder
 * @constructor
 * @implements {Encoder}
 */
var Xml = exports.Xml = function(options) {
    var self = this;

    Encoder.call(self);

    options = options || {};

    self.colorize = common.checkOption(options.colorize, false);
    self.timestamp = common.checkOption(options.timestamp, true);
    self.headFormat = common.checkOption(options.headFormat, '%L');
    self.dateFormat = common.checkOption(options.dateFormat, 'isoDateTime');

    self.contentType = 'text/xml';
    self.encoding = 'utf8';
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
 * @param {string} level The level of this message
 * @param {string} msg The message to encode
 * @param {object} meta The metadata of this log
 */
Xml.prototype.encode = function(level, msg, meta) {
    var self = this,
    head = self.headFormat.replace('%l', level.toLowerCase()).replace('%L', level.toUpperCase()),
    time = self._encodeObj(new Date()),
    log = '<log level="' + level + '"' + (self.timestamp ? ' timestamp="' + time + '"' : '') + '>';

    log += '<head>' + head + '</head>';
    log += '<message>' + self._encodeObj(msg) + '</message>';

    if(meta)
        log += '<meta>' + self._encodeObj(meta) + '</meta>';

    log += '</log>';
    return log;
};

//////////
// Private Methods
///////////////////////////
Xml.prototype._encodeObj = function(obj) {
    var self = this, nodes = '';

    if(obj.constructor == Date) {
        nodes = dateFormat(obj, self.dateFormat);
    }
    else if(obj.constructor == Object) {
        Object.keys(obj).forEach(function(key) {
            nodes += '<' + key + '>' + self._encodeObj(obj[key]) + '</' + key + '>';
        });
    }
    else if(obj.constructor == Array) {
        obj.forEach(function(val) {
            nodes += '<data>' + self._encodeObj(val) + '</data>';
        });
    }
    else nodes = obj.toString();

    return nodes;
};