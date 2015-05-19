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

	var _run = function(file, cb) {
		
		try {
			
			/*
			 * create a new CLI instance
			 */
			
			var appDir = path.dirname(require.main.filename);
	
			var args = [ '', '', '--require', '../lib/cucumber', '--format',
				   					'summary', file ];

			var Cli = Cucumber.Cli;
			var configuration = Cli.Configuration(args);
			var runtime = Cucumber.Runtime(configuration);
			var formatter = configuration.getFormatter();
			runtime.attachListener(formatter);
			runtime.start(function(response){
			
				cb(null, formatter.getLogs());
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
