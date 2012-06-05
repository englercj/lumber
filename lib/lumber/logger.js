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
config = require('./config'),
common = require('./common'),
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

    self.levels = options.levels || config.levels;
    self.colors = options.colors || config.colors;
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Logger, events.EventEmitter);

//////////
// Public Methods
///////////////////////////
