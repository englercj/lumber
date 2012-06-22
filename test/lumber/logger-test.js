/**
 * logger-test.js: Tests to ensure logger class functions properly
 *
 * (c) 2012 Panther Development
 * MIT LICENCE
 *
 **/

var fs = require('fs'),
path = require('path'),
vows = require('vows'),
assert = require('assert'),
cov = require('../coverage'),
lumber = cov.require('../lib/lumber');

vows.describe('Logger').addBatch({
    'logger module': {
        topic: function() {
            return new lumber.Logger();
        },
	'has': {
            'the correct deaults': function(logger) {
		assert.isObject(logger.levels);
		assert.deepEqual(logger.levels, lumber.defaults.levels);
		assert.deepEqual(logger.colors, lumber.defaults.colors);
            },
            'the correct functions': function(logger) {
		assert.isFunction(logger.log);

		Object.keys(logger.levels).forEach(function(key) {
                    assert.isFunction(logger[key]);
		});
            }
	},
	'should': {
	    topic: function() {
		var trans = { level: 'info', log: function(){}, encoder: {} },
		logger = new lumber.Logger({ transports: [trans] });

		return { trans: trans, logger: logger };
	    },
	    'not call silent log': function(o) {
		//make test fail if called
		o.trans.log = function() { assert.isTrue(false); };
		o.logger.log('silent', 'message');
		o.logger.silent('message');
	    },
	    'call error log': function(o) {
		//make test pass if called
		o.trans.log = function() { assert.isTrue(true); };
		o.logger.log('error', 'message');
		o.logger.error('message');
	    },
	    'call warn log': function(o) {
		//make test pass if called
		o.trans.log = function() { assert.isTrue(true); };
		o.logger.log('warn', 'message');
		o.logger.warn('message');
	    },
	    'call info log': function(o) {
		//make test pass if called
		o.trans.log = function() { assert.isTrue(true); };
		o.logger.log('info', 'message');
		o.logger.info('message');
	    },
	    'not call verbose log': function(o) {
		//make test fail if called
		o.trans.log = function() { assert.isTrue(false); };
		o.logger.log('verbose', 'message');
		o.logger.verbose('message');
	    },
	    'not call debug log': function(o) {
		//make test fail if called
		o.trans.log = function() { assert.isTrue(false); };
		o.logger.log('debug', 'message');
		o.logger.debug('message');
	    },
	    'not call silly log': function(o) {
		//make test fail if called
		o.trans.log = function() { assert.isTrue(false); };
		o.logger.log('silly', 'message');
		o.logger.silly('message');
	    }
	}
    }
}).export(module);