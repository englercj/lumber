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
lumber = require('../../lumber');

/**
 * Console Transport
 * @implements {Transport}
 */
var Console = exports.Console = function(options) {
    var self = this;

    lumber.Transport.call(self);

    options = options || {};

    self.encoder = lumber.util.checkOption(options.encoder, 'text');
    self.level = lumber.util.checkOption(options.level, 'info');

    self.name = 'console';

    if(typeof(self.encoder) == 'string') {
	var e = lumber.util.titleCase(self.encoder);
	
        if(lumber.encoders[e]) {
            self.encoder = new lumber.encoders[e]();
        } else {
            throw new Error('Unknown encoder passed: ' + self.encoder);
        }
    }
};

//////////
// Inherits from EventEmittxer
///////////////////////////
util.inherits(Console, lumber.Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string via the stdout console
 * @param {object} args The arguments for the log
 * @param {function} cb The callback to call after logging
 */
Console.prototype.log = function(args, cb) {
    var self = this,
    msg = self.encoder.encode(args.level, args.msg, args.meta);

    if(args.level === 'error')
        console.error(msg);
    else
        console.log(msg);

    if(cb) cb(null, msg, args.level, self.name);
};