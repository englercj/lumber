/**
 * lumber-test.js: Tests to ensure lumber exports itself correctly
 *
 * (c) 2012 Panther Development
 * MIT LICENCE
 *
 **/

var lumber = require('../lib/lumber'),
fs = require('fs'),
path = require('path'),
vows = require('vows'),
assert = require('assert');

vows.describe('lumber').addBatch({
    'lumber module': {
	topic: function() {
	    return null;
	},
	'should have the correct exports': function() {
	    assert.isObject(lumber);
	    assert.isObject(lumber.transports);
	    assert.isFunction(lumber.transports.Console);
	    assert.isFunction(lumber.transports.File);
	    assert.isFunction(lumber.transports.Syslog);
	    assert.isFunction(lumber.transports.Webservice);
	    assert.isObject(lumber.defaults);
	    assert.isObject(lumber.defaults.levels);
	    assert.isObject(lumber.defaults.colors);
	    assert.isFunction(lumber.Logger);

	    Object.keys(lumber.defaults.levels).forEach(function(k) {
		assert.isFunction(lumber[k]);
	    });
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
	},
    }
}).export(module);