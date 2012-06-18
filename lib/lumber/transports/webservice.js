/**
 * @license
 * webservice.js: Webservice transport
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var util = require('util'),
url = require('url'),
lumber = require('../../lumber');

/**
 * Webservice Transport
 * @implements {Transport}
 */
var Webservice = exports.Webservice = function(options) {
    var self = this;

    lumber.Transport.call(self);

    options = options || {};

    self.encoder = options.encoder || 'json';
    self.level = options.level || 'info';
    self.url = options.url || null;
    self.method = options.method || 'POST';
    self.headers = options.headers || { 'Content-Type': 'application/json' };

    self._setupEncoder();
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(Webservice, lumber.Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string to the specified webservice
 * @param {object} args
 */
Webservice.prototype.log = function(args) {

};