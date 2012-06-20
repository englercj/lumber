## Lumber (v0.0.1) [![Build Status](http://ci.pantherdev.com/job/lumber/badge/icon)](http://ci.pantherdev.com/job/lumber/)


Overview
--------

Lumber is an asynchronous logging library that is geared towards extensibility and providing an all-in-one
solution for logging in Node.js applications. It provides a method of logging to your CLI, a file log, or even
a webservice; each with independent configurable options.

It is possible with Lumber to have a verbose CLI, an error log, a debug log, and a webservice taking information
logs; each with a different encoder for their data; all with the same logger object.

Features
--------

 - Isolated customizable logging transports
 - Customizable Encoders
 - Settings changes can be made on-the-fly

Dependencies
------------

 - Node.js (0.6.x)
 - Npm (1.x.x)

Installation
------------

The easiest way to install the Lumber module is with `npm`:

    npm install lumber

For the bleeding edge build you can clone the repo and install:

    git clone git://github.com/englercj/lumber.git &&
    cd lumber &&
    npm install

Usage
-----

### Defaults

By default lumber uses a console transport, with a text encoder. You can use it simply like:

```javascript
var lumber = require('lumber'),
logger = new lumber.Logger();

logger.log('info', 'Hey there!');
//OR
logger.info('Hey there!');
```

### Multiple Transports

To use multiple transports, such as a console logger and a file. Simply specify them using the `transports` option:

```javascript
var lumber = require('lumber'),
logger = new lumber.Logger({
    transports: [
        new lumber.transports.Console(),
		new lumber.transports.File()
	]
});
	
logger.log('info', 'Hey there!');
//OR
logger.info('Hey there!');
```

This will print `info: Hey there!` to the console, as well as to the default file `app.log` (though the logfile will be in json). Another example is to have a verbose CLI, error log, and debug log:

```javascript
var lumber = require('lumber'),
logger = new lumber.Logger({
    transports: [
	    new lumber.transports.Console({ level: 'verbose' }),
		new lumber.transports.File({ filename: 'errors.log', level: 'error' }),
		new lumber.transports.File({ filename: 'debug.log', level: 'debug' })
	]
});
	
logger.info('Info message'); //logs to console & debug.log
logger.error('Error message'); //logs to console, debug.log, and errors.log
logger.debug('Debug message'); //logs to debug.log
```

### Different Encoders

If you don't like the default encoder chosen by a transport you can easily change it:

```javascript
var lumber = require('lumber'),
logger = new lumber.Logger({
    transports: [
	    new lumber.transports.File({
		    filename: 'app.log',
			encoder: 'text'
		})
	]
});
```

Or if you need to specify options on your own encoder, you can instantiate it instead of passing a string:

```javascript
var logger = new lumber.Logger({
    transports: [
	    new lumber.transports.File({
		    filename: 'app.log',
			encoder: new lumber.encoders.Text({
			    colorize: false,
				headFormat: '[%L] '
			})
		})
	]
});
```

### Custom Logging Levels

You can pass your own levels and/or colors to a logger instance to override the defaults. Remember that any 
negative log level will be considered a "silent" level, which allows for a state that the logger does not log anything:

```javascript
var logger = new lumber.Logger({
    levels: {
	    silent: -1,
	    error: 0,
		yoyo: 1,
		please: 2
	},
	colors: {
	    error: 'red',
		yoyo: 'rainbow',
		please: 'grey'
	}
});
	
//now the logger has those levels as convenience functions
logger.yoyo('Yo Yo Yo!');
logger.please('fork me');

//or you can specify them explicitly
logger.log('yoyo', 'some message');
```

Meta Data
---------

Sometime when you are logging an event (like an error) you may have some meta data that goes along with it (like the
error that was thrown). Lumber allows you to pass in this extra data to be logged along with you message:

```javascript
var fs = require('fs'),
lumber = require('lumber'),
logger = new lumber.Logger();
	
try {
    fs.statSync('doesnt_exist.file');
} catch(e) {
    logger.error(e, 'File does not exist');
	//or logger.log('error', e, 'File does not exist');
}
```

Format Params
-------------

Lumber also allows you to use format params, that is you get the power of [`util.format`](http://nodejs.org/api/util.html#util_util_format) when using lumber:

```javascript
var lumber = require('lumber'),
logger = new lumber.Logger();

logger.info('You can insert strings: %s, or numbers: %d, or event json: %j', 'like this one', 15, { hi: 'there' });
//or logger.log('info', 'You can insert strings: %s, or numbers: %d, or event json: %j', 'like this one', 15, { hi: 'there' });
	
//You can still pass meta data if you want to:
logger.info({ meta: 'data' }, 'You can insert strings: %s, or numbers: %d, or event json: %j', 'like this one', 15, { hi: 'there' });
//or logger.log('info', { meta: 'data' }, 'You can insert strings: %s, or numbers: %d, or event json: %j', 'like this one', 15, { hi: 'there' });
```

Callbacks
---------

Lumber is an asynchronous logger, so it provides a callback when it has finished logging to all of it's transports:

```javascript
var lumber = require('lumber'),
logger = new lumber.Logger({ transports: [new lumber.transports.Console(), new lumber.transports.File()] });

logger.info('A message', function(err) {
    console.log('Error:', err);
});
//or logger.log('info', 'A message', function(err) {});

//you can still specify meta data if you want
logger.info({ meta: 'data' }, 'A message', function(err) {
    console.log('Error:', err);
});
//or logger.log('info', { meta: 'data' }, 'A message', function(err) {});

//you can even continue to use format args
logger.info({ meta: 'data' }, 'A %s message', 'formatted', function(err) {
    console.log('Error:', err);
});
//or logger.log('info', { meta: 'data' }, 'A %s message', 'formatted', function(err) {});
```

Options
-------

### Logger Options

Here are all the options associated with a logger:

 - `levels`: Log levels associated with this logger, defaults to: `{ silent: -1, error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }`
 - `colors`: Colors of levels in this logger, defaults to: `{ error: 'red', warn: 'yellow', info: 'cyan', verbose: 'magenta', debug: 'green', silly: 'grey' }`
 - `transports`: The transports for this logger, instantiated from `lumber.transports`, defaults to: `[new lumber.transports.Console()]`
 - `level`: The log level of this logger (can be overridden at the transport level), defaults to: `'info'`

### Transport Options

Here are the options common to all transports:

 - `encoder`: The encoder to use for this transport, defaults vary.
 - `level`: The log level of this transport, defaults to: logger level.
 
Each Transport has it's own additional options and defaults as well, only differences from the common list are mentioned:

#### Console Transport

 - `encoder`: defaults to: `'text'`

#### File Transport

 - `encoder`: defaults to: `'json'`
 - `filename`: The filename to log to, defaults to: `'app.log'`
 
#### Webservice Transport

 - `encoder`: defaults to: `'json'`
 - `url`: The URL of the webservice, like `http://domain.com/service`
 - `method`: The method of the request to the webservice, defaults to: `'POST'`
 - `headers`: The headers to send with the request, defaults to the encoder's content type.
 - `secure`: Whether or not to use SSL, must be set for https requests, defaults to: `false`
 - `auth`: Authentication for basic auth, in the format `username:password`
 
### Encoder Options

Here are the options common to all encoders:

 - `colorize`: Whether or not to apply the color scheme, defaults vary.
 - `timestamp`: Whether or not to apply a timestamp when encoding the log, defaults vary.
 - `headFormat`: The format of the message "head", the head is a formatted way of printing the log level of this message, defaults vary.
 - `dateFormat`: The format of the timestamps on logs, uses [node-dateformat](https://github.com/felixge/node-dateformat), defaults to: `'isoDateTime'`
 
Each Encoder has it's own additional options and defaults as well, only differences from the common list are mentioned:

#### Text Encoder

 - `colorize`: defaults to: `true`
 - `timestamp`: defaults to: `false`
 - `headFormat`: defaults to: `'%l: '`

#### Json Encoder

 - `colorize`: currently has no effect
 - `timestamp`: defaults to: `true`
 - `headFormat`: defaults to: `'%L'`

#### Xml Encoder

 - `colorize`: currently has no effect
 - `timestamp`: defaults to: `true`
 - `headFormat`: defaults to: `'%L'`
