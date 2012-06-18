/**
 * @license
 * logger.js: Core logger functionality
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var events = require('events'),
util = require('util'),
lumber = require('../lumber'),
Stream = require('stream').Stream;

/**
 * Core Logger class that does the work of logging
 *    via one or more transports
 * @constructor
 * @param {object} options The options for this logger
 */
var Logger = exports.Logger = function(options) {
    var self = this;

    events.EventEmitter.call(self);

    options = options || {};

    self.levels = options.levels || lumber.defaults.levels;
    self.colors = options.colors || lumber.defaults.colors;
    self.transports = options.transports || [new lumber.transports.Console()];
    self.level = options.level || 'info';

    //create functions for log levels
    Object.keys(self.levels).forEach(function(key) {
        self[key] = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(key);
            self.log.apply(self, args);
        };
    });
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Logger, events.EventEmitter);

//////////
// Public Methods
///////////////////////////
Logger.prototype.log = function() {
    var self = this,
    args = lumber.util.prepareArgs(Array.prototype.slice.call(arguments));

    self.transports.forEach(function(trans) {
        //if we aren't a silent level && this log's level <= this transport's level
        if(self.levels[self.level] >= 0 && self.levels[args.level] <= self.levels[trans.level]) {
            trans.log.call(trans, args);
        }
    });
};