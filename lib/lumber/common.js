/**
 * @license
 * common.js: Common helpers for the entire module
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

var common = exports;

//////////
// Required Includes
///////////////////////////
var util = require('util'),
cycle = require('cycle'),
config = require('./config');

/**
 * Title cases a passed string. Changes "help" to "Help"
 * @return {string} Title-cased version of passes string
 * @param {string} str The string to captialize
 */
common.titleCase = function(str) {
    return str && str[0].toUpperCase() + str.slice(1);
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
}

/**
 * Gets the current timestamp as a string
 * @return {string} Current timestamp
 */
common.now = function() {
    return new Date().toISOString();
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
common.colorize = function(str, level) {
    return str[config.colors[level]];
};