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

    self.colorize = options.colorize || false;
    self.timestamp = options.timestamp || true;
    self.headFormat = options.headFormat || '%L';
    self.dateFormat = options.dateFormat || 'isoDateTime';

    self.contentType = 'text/xml';
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
    time = dateFormat(new Date(), self.dateFormat),
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
    var self = this;
    
    if(obj.constructor == Date)
	return dateFormat(obj, self.dateFormat);
    
    if(obj.constructor == Object) {
	var nodes = '';
	Object.keys(obj).forEach(function(key) {
	    nodes += '<' + key + '>' + self._encodeObj(obj[key]) + '</' + key + '>';
	});

	return nodes;
    }

    if(obj.constructor == Array) {
	var nodes = '';
	obj.forEach(function(val) {
	    nodes += '<data>' + self._encodeObj(val) + '</data>';
	});

	return nodes;
    }

    return obj.toString();
};