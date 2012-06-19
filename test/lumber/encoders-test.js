/**
 * encoders-test.js: Tests to ensure core encoders load properly
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
encoders = cov.require('../lib/lumber/encoders');

vows.describe('Encoders').addBatch({
    'encoders loader': {
        topic: function() {
            return null;
        },
        'should have the correct exports': function() {
            assert.isObject(encoders);
            assert.isFunction(encoders.Text);
            assert.isFunction(encoders.Json);
            assert.isFunction(encoders.Xml);
        }
    }
}).export(module);