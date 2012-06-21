/**
 * webservice-test.js: Tests the webservice transport
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

var fs = require('fs'),
path = require('path'),
http = require('http'),
vows = require('vows'),
assert = require('assert'),
cov = require('../../coverage'),
lumber = cov.require('../lib/lumber');

vows.describe('Webservice').addBatch({
    'webservice transport': {
        topic: function() {
            return new lumber.transports.Webservice();
        },
	'has': {
            'the correct defaults': function(trans) {
		assert.instanceOf(trans.encoder, lumber.encoders.Json);
		assert.isFunction(trans.encoder.encode);
		assert.equal(trans.level, 'info');
		assert.equal(trans.method, 'POST');
		assert.deepEqual(trans.headers, { 'Content-Type': 'application/json' });
		assert.isNull(trans.url);
		assert.isNull(trans.auth);
		assert.isFalse(trans.secure);
            },
            'the correct functions': function(trans) {
		assert.isFunction(trans.log);
            }
	},
	'should': {
	    topic: function(trans) {
		var logger = new lumber.Logger({ transports: [new lumber.transports.Webservice({ url: 'http://localhost:91234' })] }),
		data, that = this,
		server = http.createServer(function(req, res) {
		    req.on('data', function(chunk) {
			if(!data) data = chunk;
			else data += chunk;
		    });

		    req.on('end', function() {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({ works: 'yeah' }));
		    });
		}).listen(91234, '127.0.0.1', function() {
		    logger.log('info', 'A message');
		    logger.on('log', function() {
			var args = Array.prototype.slice.call(arguments);
			args.push(data.toString());
			that.callback.apply(that, args);
		    });
		});
	    },
	    'get the correct response': function(err, msg, level, name, url, statusCode, resData, postData) {
		assert.isTrue(!err);
		assert.equal(statusCode, 200);
		assert.equal(resData, JSON.stringify({ works: 'yeah' }));
	    },
	    'pass the correct params': function(err, msg, level, name, url, statusCode, resData, postData) {
		assert.isTrue(!err);
		assert.equal(level, 'info');
		assert.equal(name, 'webservice');
		assert.equal(url, 'http://localhost:91234');
	    },
	    'post the properly encoded data': function(err, msg, level, name, url, statusCode, resData, postData) {
		assert.isTrue(!err);
		assert.equal(msg.trim(), postData.trim());
	    }
	}
    }
}).export(module);