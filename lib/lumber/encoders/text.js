/**
 * @license
 * text.js: Text Encoder
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var util = require('util'),
dateFormat = require('dateformat'),
eyes = require('eyes'),
common = require('../common'),
Encoder = require('./encoder').Encoder;

/**
 * Text Encoder
 * @constructor
 * @implements {Encoder}
 */
var Text = exports.Text = function(options) {
    var self = this;

    Encoder.call(self);
    options = options || {};

    self.colorize = common.checkOption(options.colorize, true);
    self.timestamp = common.checkOption(options.timestamp, false);
    self.headFormat = common.checkOption(options.headFormat, '%l: ');
    self.dateFormat = common.checkOption(options.dateFormat, 'isoDateTime');

    self.inspect = eyes.inspector({ stream: null });

    self.contentType = 'text/plain';
    self.encoding = 'utf8';
};

//////////
// Inherits from Encoder
///////////////////////////
util.inherits(Text, Encoder);

//////////
// Public Methods
///////////////////////////
/**
 * Encodes the passed string into CSV Text
 * @return {string} Encoded string
 * @param {string} level The level of this message
 * @param {string} msg The message to encode
 * @param {object} meta The metadata of this log
 */
Text.prototype.encode = function(level, msg, meta) {
    var self = this,
    head = (self.colorize && self.colors ?
            self.headFormat
            .replace('%l', common.colorize(level.toLowerCase(), level, self.colors))
            .replace('%L', common.colorize(level.toUpperCase(), level, self.colors))
            :
            self.headFormat.replace('%l', level.toLowerCase()).replace('%L', level.toUpperCase())
           ),
    time = dateFormat(new Date(), self.dateFormat);

    //have to color the meta cyan since that is default
    //color for eyes, and there is a glitch that doesn't
    //color the entire object on null streams.
    //This should really be changed to use w/e the color is set for
    //ALL in eyes instead of assuming cyan
    return head + (self.timestamp ? '(' + time + ') ' : '') + msg + self._encodeMeta(meta);
};

Text.prototype._encodeMeta = function(meta) {
    var self = this;

    if(!meta) return '';

    //special error formatting
    if(meta.constructor == Error) {
        var c = self.colorize ? self.colors.error || 'red' : null,
        msg = [],
        props = ['message', 'name', 'type', 'stack', 'arguments'],
        temp;

        props.forEach(function(prop) {
            //if prop doesnt exist, move on
            if(!meta[prop]) return;

            //setup title
            if(prop == 'stack') temp = '  Stack Trace';
            else temp = '  Error ' + common.titleCase(prop);

            //color if necessary, and add value
            temp = (c ? temp[c] : temp);
            temp += ': ' + (prop == 'stack' ? '\n  ' : '') + meta[prop];

            //add to message
            msg.push(temp);
        });

        return '\n' + msg.join('\n');
    }

    //if not special case, just inspect with eyes
    return '\n\033[36m' + self.inspect(meta);
};