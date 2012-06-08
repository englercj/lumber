/**
 * console-test.js: Tests the console transport
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

vows.describe('Console').addBatch({
    'console transport': {
        topic: function() {
            return new lumber.transports.Console();
        },
        'has the correct defaults': function(con) {
            assert.instanceOf(con.encoder, lumber.encoders.Text);
            assert.isFunction(con.encoder.encode);
            assert.equal(con.level, 'info');
        },
        'has the correct functions': function(con) {
            assert.isFunction(con.log);
        }
    }
}).export(module);