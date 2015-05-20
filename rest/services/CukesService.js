/**
 * Cucumber service.
 * 
 * @author Chris Spiliotopoulos
 */

var Cucumber = require('cucumber');
var path = require('path');

module.exports = function() {
	
	/*
	 * Private
	 */

	var _run = function(file, tags, cb) {
		
		try {
			
			/*
			 * create a new CLI instance
			 */
			
			var appDir = path.dirname(require.main.filename);
	
			var args = [ '', '', '--require', '../lib/cucumber', '--format',
				   					'pretty', file ];

			/*
			 * any specific tags to be executed?
			 */
			if (typeof tags !== 'undefined')
			{
				args.push('--tags');
				args.push( tags );
			}
			
			var Cli = Cucumber.Cli;
			var configuration = Cli.Configuration(args);
			var runtime = Cucumber.Runtime(configuration);
			var formatter = configuration.getFormatter();
			runtime.attachListener(formatter);
			runtime.start(function(response){
				
				// return the response and log trace
				cb(response, formatter.getLogs());
			});
						
		} catch (e) {
			console.error(e);
		}
	}

	return {
		
		/*
		 * Public
		 */

		run : _run
	
	};
	
}();
