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
fs = require('fs'),
path = require('path'),
lumber = require('../../lumber');

/**
 * File Transport
 * @implements {Transport}
 */
var File = exports.File = function(options) {
    var self = this;

    lumber.Transport.call(self);

    options = options || {};

    self.encoder = options.encoder || 'json';
    self.level = options.level || 'info';
    self.filename = path.resolve(options.filename) || path.resolve('app.log');

    self._setupEncoder();
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(File, lumber.Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string to the specified file
 * @param {object} args The arguments for the log
 */
File.prototype.log = function(args) {
    var self = this,
    msg = self.encoder.encode(args.level, args.msg, args.meta);

    fs.open(self.filename, 'a', 0666, function(err, fd) {
	if(err) { if(args.cb) args.cb(err, msg, args.level); return; }

	fs.write(fd, msg, 0, msg.length, null, function(err) {
	    fs.close(fd);

	    if(args.cb) args.cb(err, msg, args.level);
	});
    });
};