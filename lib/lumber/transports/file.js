/**
 * @license
 * file.js: File transport
 *
 * Liberal inspiration taken from https://github.com/flatiron/winston
 *
 * (c) 2012 Panther Development
 * MIT LICENSE
 *
 */

//////////
// Required Includes
///////////////////////////
var util = require('util'),
fs = require('fs'),
path = require('path'),
lumber = require('../../lumber');

/**
 * File Transport
 * @constructor
 * @implements {Transport}
 */
var File = exports.File = function(options) {
    var self = this;

    lumber.Transport.call(self);

    options = options || {};

    self.encoder = lumber.util.checkOption(options.encoder, 'json');
    self.level = lumber.util.checkOption(options.level, 'info');
    self.filename = lumber.util.checkOption(options.filename, path.resolve('app.log'));
    self.filemode = lumber.util.checkOption(options.filemode, '0666');
    self.maxsize = lumber.util.checkOption(options.maxsize, 52428800); //50MB
    self.rotate = lumber.util.checkOption(options.rotate, 10);

    self._size = 0;
    self._buffer = [];

    self.name = 'file';

    if(typeof(self.encoder) == 'string') {
        var e = lumber.util.titleCase(self.encoder);

        if(lumber.encoders[e]) {
            self.encoder = new lumber.encoders[e]();
        } else {
            throw new Error('Unknown encoder passed: ' + self.encoder);
        }
    }

    self.encoding = self.encoder.encoding;
};

//////////
// Inherits from EventEmitter
///////////////////////////
util.inherits(File, lumber.Transport);

//////////
// Public Methods
///////////////////////////
/**
 * Logs the string to the specified file
 * @param {object} args The arguments for the log
 * @param {function} cb The callback to call when completed
 */
File.prototype.log = function(args, cb) {
    var self = this,
    msg = self.encoder.encode(args.level, args.msg, args.meta);

    self._open(function(buff) {
        if(buff) {
            self._buffer.push([msg, args, cb]);
        } else {
            self._write(msg + '\n', function(err) {
                if(cb) cb(err, msg, args.level, self.name, self.filename);
            });
        }
    });
};

//////////
// Public Methods
///////////////////////////
File.prototype._write = function(data, cb) {
    var self = this;

    //add size of this new message
    self._size += data.length;

    //write to stream
    var flushed = self._stream.write(data, self.encoding);

    if(flushed) {
        //check if logs need to be rotated
        if(self.maxsize && self._size >= self.maxsize) {
            self._rotateLogs(function(err) {
                self._size = 0;
                if(cb) cb(err);
            });
        } else {
            if(cb) cb(null);
        }
    } else {
        //after msg is drained
        self._drain(function() {
            //check if logs need to be rotated
            if(self.maxsize && self._size >= self.maxsize) {
                self._rotateLogs(function(err) {
                    self._size = 0;
                    if(cb) cb(err);
                });
            } else {
                if(cb) cb(null);
            }
        });
    }
};

File.prototype._open = function(cb) {
    var self = this;

    if(self._opening) {
        if(cb) cb(true);
    } else if(self._stream) {
        //already have an open stream
        if(cb) cb(false);
    } else {
        //need to open new stream, buffer msg
        if(cb) cb(true);

        //check file sizes for rotation
        self._checkSize(function(err) {
            //after rotation create stream
            self._stream = fs.createWriteStream(self.filename, {
                flags: 'a',
                encoding: self.encoding,
                mode: self.fileMode
            });

            self._stream.setMaxListeners(Infinity);

            self.once('flush', function() {
                self._opening = false;
                self.emit('open', self.filename);
            });

            self._flush();
        });
    }
};

File.prototype._close = function(cb) {
    var self = this;

    if(self._stream) {
        self._stream.end();
        self._stream.destroySoon();

        self.on('close', function() {
            self.emit('closed');
            if(cb) cb(null);
        });
        self._stream = null;
    } else {
        self._stream = null;
        if(cb) cb(null);
    }
};

File.prototype._drain = function(cb) {
    var self = this;

    //easy way to handle drain callback
    self._stream.once('drain', function() {
        self.emit('drain');
        if(cb) cb();
    });
};

File.prototype._flush = function(cb) {
    var self = this;

    if(self._buffer.length === 0) {
	self.emit('flush');
	if(cb) cb(null);
	return;
    }

    //start a write for each one
    self._buffer.forEach(function(log) {
        (function(msg, args, cb) {
            process.nextTick(function() {
                self._write(msg + '\n', function(err) {
                    if(cb) cb(err, msg, args.level, self.name, self.filename);
                });
            });
        }).apply(self, log);
    });

    //after writes are started clear buffer
    self._buffer.length = 0;

    //emit flush after the stream drains
    self._drain(function() {
        self.emit('flush');
        if(cb) cb(null);
    });
};

File.prototype._checkSize = function(cb) {
    var self = this;

    //check size of file
    fs.stat(self.filename, function(err, stats) {
        //if err and error isnt that it doesnt exist
        if(err && err.code !== 'ENOENT') {
            if(cb) cb(err);
            return;
        }

        self._size = (stats ? stats.size : 0);

        //if the size is >= maxsize, rotate files
        if(self._size >= self.maxsize) {
            self._size = 0;
            self._rotateLogs(cb);
        } else {
            cb(null);
        }
    });
};

File.prototype._rotateLogs = function(cb) {
    var self = this,
    max = 1, exists = false;

    //keep going until we find max number that doesn't exist
    do {
        try {
            fs.lstatSync(self.filename + '.' + max);
            exists = true;
            max++;
        } catch(e) {
            exists = false;
        }
    } while(exists);

    self._close(function() {
        //loop through each file and move their numbers up
        self._doLogRotate(max, function(err) {
            if(err) { if(cb) cb(err); return; }

            self.emit('rotate');

            //if the max file is more than how many we keep remove it
            if(max > self.rotate) {
                fs.unlink(self.filename + '.' + max, function(err) {
                    if(cb) cb(err);
                });
            } else {
                if(cb) cb(null);
            }
        });
    });
};

File.prototype._doLogRotate = function(num, cb) {
    var self = this;

    //if we at 0 we are done
    if(!num) { if(cb) cb(null); return; }

    //setup filenames to move
    var from = self.filename + (num > 1 ? '.' + (num - 1) : ''),
    to = self.filename + '.'  + num;

    //move files
    fs.rename(from, to, function(err) {
        if(err) { if(cb) cb(err); return; }

        //move the next one
        num--;
        self._doLogRotate(num, cb);
    });
};
