/**
 * file-test.js: Tests the file transport
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

var fs = require('fs'),
path = require('path'),
vows = require('vows'),
assert = require('assert'),
cov = require('../../coverage'),
lumber = cov.require('../lib/lumber');

vows.describe('File').addBatch({
    'file transport': {
        topic: function() {
            return new lumber.transports.File();
        },
	'has': {
            'the correct defaults': function(trans) {
		assert.instanceOf(trans.encoder, lumber.encoders.Json);
		assert.isFunction(trans.encoder.encode);
		assert.equal(trans.level, 'info');
		assert.equal(trans.filename, path.resolve('app.log'));
            },
            'the correct functions': function(trans) {
		assert.isFunction(trans.log);
            }
	},
	'should': {
	    topic: function(trans) {
		try { fs.unlinkSync(path.resolve('app.log')); } catch(e) {}

		var logger = new lumber.Logger({ transports: [trans] });

		logger.log('info', 'A message');
		logger.on('log', this.callback);
	    },
	    'create the proper file': function(err, msg, level, name, filename) {
		var f;
		try { f = fs.statSync(path.resolve('app.log')); } catch(e) {}

		assert.isTrue(!err);
		assert.isTrue(!!f);
	    },
	    'pass the correct params': function(err, msg, level, name, filename) {
		assert.isTrue(!err);
		assert.equal(level, 'info');
		assert.equal(name, 'file');
		assert.equal(filename, path.resolve('app.log'));
	    },
	    'write properly enocoded data': function(err, msg, level, name, filename) {
		assert.isTrue(!err);
		assert.equal(msg.trim(), fs.readFileSync(path.resolve('app.log'), 'utf8').trim());
	    },
	    teardown: function(err) {
		try { fs.unlinkSync(path.resolve('app.log')); } catch(e) {}
	    }
	}
    }
}).export(module);