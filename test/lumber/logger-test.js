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
        'should have deaults set': function(logger) {
            assert.isObject(logger.levels);
            assert.deepEqual(logger.levels, lumber.defaults.levels);
            assert.deepEqual(logger.colors, lumber.defaults.colors);
        },
        'should have correct functions': function(logger) {
            assert.isFunction(logger.log);

            Object.keys(logger.levels).forEach(function(key) {
                assert.isFunction(logger[key]);
            });
        }
        //TODO: Test that funcs work properly
    }
}).export(module);