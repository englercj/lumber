/**
 * json-test.js: Tests the json encoder
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

vows.describe('Json').addBatch({
    'json encoder': {
        topic: function() {
            return new lumber.encoders.Json();
        },
        'has': {
            'the correct defaults': function(enc) {
                assert.isFalse(enc.colorize);
                assert.isTrue(enc.timestamp);
                assert.equal(enc.headFormat, '%L');
                assert.equal(enc.dateFormat, 'isoDateTime');
		assert.equal(enc.contentType, 'application/json');
            },
            'has the correct functions': function(enc) {
                assert.isFunction(enc.encode);
            }
        },
        'encode works': {
            'without timestamp, or meta': function(enc) {
                enc.timestamp = false;
                assert.equal(enc.encode('info', 'The Message'), JSON.stringify({ level: 'info', head: 'INFO', message: 'The Message' }));
                assert.equal(enc.encode('warn', 'The Message'), JSON.stringify({ level: 'warn', head: 'WARN', message: 'The Message' }));
                assert.equal(enc.encode('error', 'The Message'), JSON.stringify({ level: 'error', head: 'ERROR', message: 'The Message' }));
            },
            'with timestamp, without meta': function(enc) {
                enc.timestamp = true;
                assert.match(enc.encode('info', 'The Message'), re(JSON.stringify({ level: 'info', head: 'INFO', message: 'The Message', timestamp: '[\\d\\-]+T[\\d:]+' })));
                assert.match(enc.encode('warn', 'The Message'), re(JSON.stringify({ level: 'warn', head: 'WARN', message: 'The Message', timestamp: '[\\d\\-]+T[\\d:]+' })));
                assert.match(enc.encode('error', 'The Message'), re(JSON.stringify({ level: 'error', head: 'ERROR', message: 'The Message', timestamp: '[\\d\\-]+T[\\d:]+' })));
            },
            'without timestamp, with meta': function(enc) {
                enc.timestamp = false;

                assert.equal(enc.encode('info', 'The Message', { meta: 'data' }),
			     JSON.stringify({ level: 'info', head: 'INFO', message: 'The Message', meta: { meta: 'data' } }));

                assert.equal(enc.encode('warn', 'The Message', { meta: 'data' }),
			     JSON.stringify({ level: 'warn', head: 'WARN', message: 'The Message', meta: { meta: 'data' } }));

                assert.equal(enc.encode('error', 'The Message', { meta: 'data' }),
			     JSON.stringify({ level: 'error', head: 'ERROR', message: 'The Message', meta: { meta: 'data' } }));
            },
            'with timestamp, and meta': function(enc) {
                enc.timestamp = true;

                assert.match(enc.encode('info', 'The Message', { meta: 'data' }),
			     re(JSON.stringify({ level: 'info', head: 'INFO', message: 'The Message', timestamp: '[\\d\\-]+T[\\d:]+', meta: { meta: 'data' } })));

                assert.match(enc.encode('warn', 'The Message', { meta: 'data' }),
			     re(JSON.stringify({ level: 'warn', head: 'WARN', message: 'The Message', timestamp: '[\\d\\-]+T[\\d:]+', meta: { meta: 'data' } })));

                assert.match(enc.encode('error', 'The Message', { meta: 'data' }),
			     re(JSON.stringify({ level: 'error', head: 'ERROR', message: 'The Message', timestamp: '[\\d\\-]+T[\\d:]+', meta: { meta: 'data' } })));
            }
        }
    }
}).export(module);

function re(str) {
    return new RegExp(str.replace(/\\\\(.)/g, '\\$1'));
}