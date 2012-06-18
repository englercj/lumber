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

    self.encoder = options.encoder || lumber.defaults.encoder;
    self.level = options.level || lumber.defaults.level;

    self._setupEncoder();
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