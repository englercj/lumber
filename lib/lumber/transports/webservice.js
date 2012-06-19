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
http = require('http'),
https = require('https'),
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
    self.headers = options.headers || null;
    self.secure = options.secure || false;
    self.auth = options.auth || null;

    if(typeof(self.encoder) == 'string') {
	var e = lumber.util.titleCase(self.encoder);
	
        if(lumber.encoders[e]) {
            self.encoder = new lumber.encoders[e]();
        } else {
            throw new Error('Unknown encoder passed: ' + self.encoder);
        }
    }

    if(!self.headers) {
	self.headers = { 'Content-Type': self.encoder.contentType };
    }
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
    var self = this,
    msg = self.encoder.encode(args.level, args.msg, args.meta),
    opts = url.parse(self.url),
    req, data;
    
    opts.port = opts.port || (self.secure ? 443 : 80);
    opts.method = self.method;
    opts.headers = self.headers;

    if(self.auth) opts.auth = self.auth;
    
    if(self.secure) {
	req = https.request(opts);
    } else {
	req = http.request(opts);
    }

    //setup listeners
    req.on('response', function(res) {
	res.on('data', function(chunk) {
	    if(!data) data = chunk;
            else data += chunk;
	});

	res.on('end', function() {
	    if(args.cb) args.cb(null, msg, args.level, res.statusCode, data);
	});

	res.on('close', function(err) {
	    if(args.cb) args.cb(err, msg, args.level, res.statusCode, data);
	});
    });

    req.on('error', function(err) {
	if(args.cb) args.cb(err);
    });

    //write msg to body
    req.write(msg);
    req.end();
};