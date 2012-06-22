/**
 * text-test.js: Tests the text encoder
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
inspect = require('eyes').inspector({ stream: null }),
lumber = cov.require('../lib/lumber');

vows.describe('Text').addBatch({
    'text encoder': {
        topic: function() {
            return new lumber.encoders.Text();
        },
        'has': {
            'the correct defaults': function(enc) {
                assert.isTrue(enc.colorize);
                assert.isFalse(enc.timestamp);
                assert.equal(enc.headFormat, '%l: ');
                assert.equal(enc.dateFormat, 'isoDateTime');
		assert.equal(enc.contentType, 'text/plain');
                assert.isFunction(enc.inspect);
            },
            'the correct functions': function(enc) {
                assert.isFunction(enc.encode);
            }
        },
        'enocde works': {
            'without timestamp, or meta': function(enc) {
                enc.timestamp = false;
                assert.equal(enc.encode('info', 'The Message'), 'info: The Message');
                assert.equal(enc.encode('warn', 'The Message'), 'warn: The Message');
                assert.equal(enc.encode('error', 'The Message'), 'error: The Message');
            },
            'with timestamp, without meta': function(enc) {
                enc.timestamp = true;
                assert.match(enc.encode('info', 'The Message'), /info: \([\d\-]+T[\d:]+\) The Message/);
                assert.match(enc.encode('warn', 'The Message'), /warn: \([\d\-]+T[\d:]+\) The Message/);
                assert.match(enc.encode('error', 'The Message'), /error: \([\d\-]+T[\d:]+\) The Message/);
            },
            'without timestamp, with meta': function(enc) {
                enc.timestamp = false;

                assert.equal(enc.encode('info', 'The Message', { meta: 'data' }),
                             'info: The Message\n\033[36m' + inspect({ meta: 'data' }));

                assert.equal(enc.encode('warn', 'The Message', { meta: 'data' }),
                             'warn: The Message\n\033[36m' + inspect({ meta: 'data' }));

                assert.equal(enc.encode('error', 'The Message', { meta: 'data' }),
                             'error: The Message\n\033[36m' + inspect({ meta: 'data' }));
            },
            'with timestamp, and meta': function(enc) {
                enc.timestamp = true;

                assert.match(enc.encode('info', 'The Message', { meta: 'data' }),
                             (/^info: \([\d\-]+T[\d:]+\) The Message\n.+\{ .+ \}.+$/));

                assert.match(enc.encode('warn', 'The Message', { meta: 'data' }),
                             (/^warn: \([\d\-]+T[\d:]+\) The Message\n.+\{ .+ \}.+$/));

                assert.match(enc.encode('error', 'The Message', { meta: 'data' }),
                             (/^error: \([\d\-]+T[\d:]+\) The Message\n.+\{ .+ \}.+$/));
            }
	}
    }
}).export(module);