/**
 * @license
 * config.js: Default configuration for lumber
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

var config = exports;

//////////
// Required Includes
///////////////////////////
var colors = require('colors');

config.levels = {
    silent: -1,
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};

config.colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    verbose: 'magenta',
    debug: 'green',
    silly: 'grey'
};