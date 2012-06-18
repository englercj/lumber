/**
 * lumber-test.js: Tests to ensure lumber exports itself correctly
 *
 * (c) 2012 Panther Development
 * MIT LICENCE
 *
 **/

var fs = require('fs'),
path = require('path'),
vows = require('vows'),
assert = require('assert'),
cov = require('./coverage'),
lumber = cov.require('../lib/lumber');

vows.describe('Lumber').addBatch({
    'lumber module': {
        topic: function() {
            return null;
        },
        'should have the correct exports': function() {
            //global export
            assert.isObject(lumber);
            //transports
            assert.isObject(lumber.transports);
            assert.isFunction(lumber.transports.Console);
            assert.isFunction(lumber.transports.File);
            assert.isFunction(lumber.transports.Webservice);
            //encoders
            assert.isObject(lumber.encoders);
            assert.isFunction(lumber.encoders.Json);
            assert.isFunction(lumber.encoders.Xml);
            assert.isFunction(lumber.encoders.Text);
            //utils
            assert.isObject(lumber.util);
            //core
            assert.isFunction(lumber.Logger);
            assert.isFunction(lumber.Transport);
            assert.isFunction(lumber.Encoder);
            //config
            assert.isObject(lumber.defaults);
            assert.isObject(lumber.defaults.levels);
            assert.isObject(lumber.defaults.colors);

            //levels functions, for default logger
            /*
              Object.keys(lumber.defaults.levels).forEach(function(k) {
              assert.isFunction(lumber[k]);
              });
            */
        },
        'should': {
            topic: function() {
                fs.readFile(path.join(__dirname, '..', 'package.json'), this.callback);
            },
            'have the correct version': function(err, data) {
                assert.isNull(err);
                var s  = JSON.parse(data.toString());
                assert.equal(lumber.version, s.version);
            }
        }
    }
}).export(module);