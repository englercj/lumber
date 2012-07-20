/**
 * @license
 * common.js: Common helpers for the entire module
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

var common = module.exports;

//////////
// Required Includes
///////////////////////////
var util = require('util'),
colors = require('colors'),
cycle = require('cycle');

/**
 * Sets a variable to the default if it is unset
 * @return {mixed} The option set 
 * @param {mixed} opt The option value passed
 * @param {mixed} val The default value to set
 */
common.checkOption = function(opt, val) {
    return (typeof(opt) == 'undefined' ? val : opt);
};

/**
 * Title cases a passed string. Changes "help" to "Help"
 * @return {string} Title-cased version of passes string
 * @param {string} str The string to captialize
 */
common.titleCase = function(str) {
    var lines = str.split('\n');

    lines.forEach(function(line, l) {
        var words = line.split(' ');

        words.forEach(function(word, w) {
            words[w] = word[0].toUpperCase() + word.slice(1);
        });

        lines[l] = words.join(' ');
    });

    return lines.join('\n');
};

/**
 * Generates a random GUID
 * @return {string} GUID
 */
common.generateGuid = function() {
    /**
     * Generates 4 hex characters
     * @return {string} 4 character hex string
     */
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

/**
 * Padds a string to the length specified
 * @return {string} Padded string
 * @param {string} str String to pad
 * @param {string} pad What to pad the string with
 * @param {number} len The length of final string
 */
common.pad = function(str, pad, len) {
    while(str.length < len)
        str = pad + str;

    return str;
};

/**
 * Colorizes a string based on a level
 * @return {string} Colorized string
 * @param {string} str The string to colorize
 * @param {string} level The level the string should be colorized to
 */
common.colorize = function(str, level, colors) {
    return str[colors[level]];
};

/**
 * Prepares an arguments array for use by a log function
 * @return {object} Perpares arguments for a log method
 * @param {array} args The arguments to prepare
 */
common.prepareArgs = function(args) {
    var obj = {
        level: args[0],
        meta: args[1],
        msg: args[2],
        cb: args[args.length - 1]
    },
    argStart = 3, fargs, lmsg = args[2];

    //if meta is a string, we consider it the message
    if(typeof(obj.meta) == 'string') {
        argStart = 2;
        obj.msg = obj.meta;
        obj.meta = null;
    }

    //if cb is not a func, then all left are format args
    if(typeof(obj.cb) != 'function') {
        obj.cb = null;
        fargs = args.slice(argStart);
    }
    //if it is, then only upto the last item is format args
    else {
        fargs = args.slice(argStart, args.length - 1);
    }

    //at this point if msg is a function, its the callback
    if(typeof(obj.msg) == 'function') {
	obj.cb = obj.msg;
	obj.msg = '';
    }

    //if we have format args, then lets apply them
    if(fargs.length) {
        //put msg on and apply to util.format
        fargs.unshift(obj.msg);
        obj.msg = util.format.apply(null, fargs);
    }

    return obj;
};