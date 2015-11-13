/*
 * Modules
 */
var nconf = require('nconf');
var strformat = require('strformat');

module.exports = function() {

	var Given = When = Then = this.defineStep;

	/**
	 * Given
	 */
	Given(/^a "([^"]*)" API definition at "([^"]*)"$/, function (type, url, cb) {

		var world = this;

		var Api = world.Api;

		// replace any property placeholders in the URL
		url = strformat(url, nconf.get());

		/*
		 * parse the API definition
		 */
		Api.parseDefinition( type, url, function(err, definition){

			cb(err);
		});



	});


};
