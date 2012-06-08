/**
 * common-test.js: Tests to ensure commong functions work properly
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
common = cov.require('../lib/lumber/common');

vows.describe('Common').addBatch({
    'common module': {
        topic: function() {
            return null;
        },
        'should have the correct exports': function() {
            assert.isFunction(common.titleCase);
            assert.isFunction(common.generateGuid);
            assert.isFunction(common.pad);
            assert.isFunction(common.colorize);
            assert.isFunction(common.prepareArgs);
        },
        'when using titleCase': {
            'single words should uppercase': function() {
                assert.equal(common.titleCase('hey'), 'Hey');
                assert.equal(common.titleCase('down'), 'Down');
            },
            'multiple words should uppercase': function() {
                assert.equal(common.titleCase('hey there'), 'Hey There');
                assert.equal(common.titleCase('Hey ho, let\'s Go!\nlawl no, sir!'),
                             'Hey Ho, Let\'s Go!\nLawl No, Sir!');
            }
        },
        'when generating a guid': {
            topic: function() {
                return (/^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/);
            },
            'it should match the guid pattern': function(regex) {
                assert.match(common.generateGuid(), regex);
                assert.match(common.generateGuid(), regex);
                assert.match(common.generateGuid(), regex);
                assert.match(common.generateGuid(), regex);
                assert.match(common.generateGuid(), regex);
                assert.match(common.generateGuid(), regex);
            }
        },
        'when padding a string': {
            'it should be the right length': function() {
                assert.lengthOf(common.pad('str', ' ', 10), 10);
                assert.lengthOf(common.pad('19', '0', 3), 3);
                assert.lengthOf(common.pad('dots', '.', 25), 25);
            },
            'it should be the right pad char': function() {
                assert.equal(common.pad('str', ' ', 10), '       str');
                assert.equal(common.pad('19', '0', 3), '019');
                assert.equal(common.pad('dots', '.', 25), '.....................dots');
            }
        },
        'when colorizing a string': {
            topic: function() {
                return {
                    info: 'cyan',
                    error: 'red',
                    warn: 'yellow',
                    verbose: 'grey'
                };
            },
            'it should be the right color': function(colors) {
                assert.equal(common.colorize('str', 'info', colors), '\u001b[36mstr\u001b[39m');
                assert.equal(common.colorize('str', 'error', colors), '\u001b[31mstr\u001b[39m');
                assert.equal(common.colorize('str', 'warn', colors), '\u001b[33mstr\u001b[39m');
                assert.equal(common.colorize('str', 'verbose', colors), '\u001b[90mstr\u001b[39m');
            }
        },
        'when preparing arguments': {
            'calls with no meta, no formats, and no callback should work': function() {
                var args = common.prepareArgs(['error', 'This is the message']);

                assert.equal(args.level, 'error');
                assert.isNull(args.meta);
                assert.equal(args.msg, 'This is the message');
                assert.isNull(args.cb);
            },
            'calls with meta, no formats, and no callback should work': function() {
                var args = common.prepareArgs(['error', { meta: 'data' }, 'This is the message']);

                assert.equal(args.level, 'error');
                assert.deepEqual(args.meta, { meta: 'data' });
                assert.equal(args.msg, 'This is the message');
                assert.isNull(args.cb);
            },
            'calls with no meta, formats, and no callback should work': function() {
                var args = common.prepareArgs(['error', 'This is the message %s %d', 'and more', 15]);

                assert.equal(args.level, 'error');
                assert.isNull(args.meta);
                assert.equal(args.msg, 'This is the message and more 15');
                assert.isNull(args.cb);
            },
            'calls with meta, formats, and no callback should work': function() {
                var args = common.prepareArgs(['error', { meta: 'data' }, 'This is the message %s %d', 'and more', 15]);

                assert.equal(args.level, 'error');
                assert.deepEqual(args.meta, { meta: 'data' });
                assert.equal(args.msg, 'This is the message and more 15');
                assert.isNull(args.cb);
            },
            'calls with no meta, no formats, and a callback should work': function() {
                var args = common.prepareArgs(['error', 'This is the message', function() {}]);

                assert.equal(args.level, 'error');
                assert.isNull(args.meta);
                assert.equal(args.msg, 'This is the message');
                assert.isFunction(args.cb);
            },
            'calls with meta, no formats, and a callback should work': function() {
                var args = common.prepareArgs(['error', { meta: 'data' }, 'This is the message', function() {}]);

                assert.equal(args.level, 'error');
                assert.deepEqual(args.meta, { meta: 'data' });
                assert.equal(args.msg, 'This is the message');
                assert.isFunction(args.cb);
            },
            'calls with no meta, formats, and a callback should work': function() {
                var args = common.prepareArgs(['error', 'This is the message %s %d', 'and more', 15, function() {}]);

                assert.equal(args.level, 'error');
                assert.isNull(args.meta);
                assert.equal(args.msg, 'This is the message and more 15');
                assert.isFunction(args.cb);
            },
            'calls with meta, formats, and a callback should work': function() {
                var args = common.prepareArgs(['error', { meta: 'data' }, 'This is the message %s %d', 'and more', 15, function() {}]);

                assert.equal(args.level, 'error');
                assert.deepEqual(args.meta, { meta: 'data' });
                assert.equal(args.msg, 'This is the message and more 15');
                assert.isFunction(args.cb);
            }
        }
    }
}).export(module);