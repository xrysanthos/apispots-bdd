/**
 * Bootstrap service.
 * 
 * 
 */

var log = require('winston');
var fs = require('fs');
var async = require("async");
var nconf = require('nconf');

module.exports = function() {
	
	// is the environment initialized?
	var _initialized = false;
	
	// Array to hold async tasks
	var _asyncTasks = [];
	
	/**
	 * Sets up the logging context
	 */
	function _setupLogging(callback) {
		
		/*
		 * setup logging framework
		 */
		log.info('Initializing logging framework...');
		
		// Console transport
		if ((nconf.get()) && (typeof nconf.get().logging != 'undefined')
				&& (typeof nconf.get().logging.console != 'undefined')
				&& (typeof nconf.get().logging.console.level != 'undefined')) {
			
			// log.transports.Console.level = nconf.get().logging.console.level;
			log.remove(log.transports.Console);
			
			log.add(log.transports.Console, {
				level : nconf.get().logging.console.level,
				colorize : true
			});
			
			log.info('|_ Added Console transport [Level: '
					+ nconf.get().logging.console.level + ']');
		}
		
		// File transport support
		if ((nconf.get()) && (typeof nconf.get().logging != 'undefined')
				&& (typeof nconf.get().logging.file != 'undefined')
				&& (typeof nconf.get().logging.file.filename != 'undefined')) {
			
			log.add(log.transports.File, {
				level : nconf.get().logging.file.level,
				filename : nconf.get().logging.file.filename,
				maxsize : nconf.get().logging.file.maxSize,
				maxFiles : nconf.get().logging.file.maxFiles,
				inlineMeta : true
			});
			
			log.info('|_ Added File transport [Log file: '
					+ nconf.get().logging.file.filename + ']');
		}
		
		// PaperTrail transport support
		if ((nconf.get()) && (typeof nconf.get().logging != 'undefined')
				&& (typeof nconf.get().logging.papertrail != 'undefined')) {
			log.add(Papertrail, {
				level : nconf.get().logging.papertrail.level,
				host : nconf.get().logging.papertrail.host,
				port : nconf.get().logging.papertrail.port,
				logFormat : function(level, message) {
					return '[' + level + '] ' + message;
				},
				inlineMeta : true
			})

			log.info('|_ Added PaperTrail transport [Host: '
					+ nconf.get().logging.papertrail.host + ' Port: '
					+ +nconf.get().logging.papertrail.port + ']');
			
		}
		
		return callback();
	}
	
	return {
		
		/**
		 * 
		 */
		setup : function(callback) {
			
			if (_initialized)
				return;
			
			log.info('==========================================');
			log.info('Setting up contexts...');
			
			// setup logging
			_asyncTasks.push(_setupLogging);
			
			async.parallel(_asyncTasks, function() {
				
				log.info('All contexts configured successfuly.');
				log.info('===========================================');
				
				_initialized = true;
				
				// notify listeners
				if (callback)
					return callback();
				
			});
			
		}
	
	};
	
}();
