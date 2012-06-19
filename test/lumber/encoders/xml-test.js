/**
 * xml-test.js: Tests the xml encoder
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

vows.describe('Xml').addBatch({
    'xml encoder': {
        topic: function() {
            return new lumber.encoders.Xml();
        },
        'has': {
            'the correct defaults': function(enc) {
                assert.isFalse(enc.colorize);
                assert.isTrue(enc.timestamp);
                assert.equal(enc.headFormat, '%L');
                assert.equal(enc.dateFormat, 'isoDateTime');
		assert.equal(enc.contentType, 'text/xml');
            },
            'the correct functions': function(enc) {
                assert.isFunction(enc.encode);
            }
        },
        'enocde works': {
            'without timestamp, or meta': function(enc) {
                enc.timestamp = false;
                assert.equal(enc.encode('info', 'The Message'),
			     '<log level="info"><head>INFO</head><message>The Message</message></log>');
                assert.equal(enc.encode('warn', 'The Message'),
			     '<log level="warn"><head>WARN</head><message>The Message</message></log>');
                assert.equal(enc.encode('error', 'The Message'), 
			     '<log level="error"><head>ERROR</head><message>The Message</message></log>');
            },
            'with timestamp, without meta': function(enc) {
                enc.timestamp = true;
                assert.match(enc.encode('info', 'The Message'), 
			     (/<log level="info" timestamp="[\d\-]+T[\d:]+"><head>INFO<\/head><message>The Message<\/message><\/log>/));
                assert.match(enc.encode('warn', 'The Message'),
			     (/<log level="warn" timestamp="[\d\-]+T[\d:]+"><head>WARN<\/head><message>The Message<\/message><\/log>/));
                assert.match(enc.encode('error', 'The Message'),
			     (/<log level="error" timestamp="[\d\-]+T[\d:]+"><head>ERROR<\/head><message>The Message<\/message><\/log>/));
            },
            'without timestamp, with meta': function(enc) {
                enc.timestamp = false;

                assert.equal(enc.encode('info', 'The Message', { meta: 'data', ary: ['msg'] }),
			     '<log level="info"><head>INFO</head><message>The Message</message><meta><meta>data</meta><ary><data>msg</data></ary></meta></log>');

                assert.equal(enc.encode('warn', 'The Message', { meta: 'data', ary: ['msg'] }),
                             '<log level="warn"><head>WARN</head><message>The Message</message><meta><meta>data</meta><ary><data>msg</data></ary></meta></log>');

                assert.equal(enc.encode('error', 'The Message', { meta: 'data', ary: ['msg'] }),
                             '<log level="error"><head>ERROR</head><message>The Message</message><meta><meta>data</meta><ary><data>msg</data></ary></meta></log>');
            },
            'with timestamp, and meta': function(enc) {
                enc.timestamp = true;

                assert.match(enc.encode('info', 'The Message', { meta: 'data', ary: ['msg'] }),
			     (/<log level="info" timestamp="[\d\-]+T[\d:]+"><head>INFO<\/head><message>The Message<\/message><meta><meta>data<\/meta><ary><data>msg<\/data><\/ary><\/meta><\/log>/));

                assert.match(enc.encode('warn', 'The Message', { meta: 'data', ary: ['msg'] }),
			     (/<log level="warn" timestamp="[\d\-]+T[\d:]+"><head>WARN<\/head><message>The Message<\/message><meta><meta>data<\/meta><ary><data>msg<\/data><\/ary><\/meta><\/log>/));

                assert.match(enc.encode('error', 'The Message', { meta: 'data', ary: ['msg'] }),
			     (/<log level="error" timestamp="[\d\-]+T[\d:]+"><head>ERROR<\/head><message>The Message<\/message><meta><meta>data<\/meta><ary><data>msg<\/data><\/ary><\/meta><\/log>/));
            }
	}
    }
}).export(module);