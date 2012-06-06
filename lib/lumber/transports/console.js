/**
 * @license
 * console.js: Console transport
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var util = require('util'),
lumber = require('../../lumber.js');

/**
 * Console Transport
 * @implements {Transport}
 */
var Console = exports.Console = function(options) {
    var self = this;

    Transport.call(self);

    options = options || {};

    self.encoder = options.encoder || 'text';
    self.level = options.level || 'info';

    if(typeof(self.encoder) == 'string') {
	if(lumber.encoders[self.encoder]) {
	    self.encoder = new lumber.encoders[self.encoder];
	} else {
	    throw new Error('Unknown encoder passed: ' + self.encoder);
	}
    }
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Console, lumber.Transport)

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string via the stdout console
 * @param {object} args The arguments for the log
 */
Console.prototype.log = function(args) {
    var self = this,
    msg = self.encoder.encode(args.level, args.msg, args.meta);

    if(args.level === 'error')
	console.error(msg);
    else
	console.log(msg);
    
    if(args.cb) args.cb(null, msg, args.level);
};