/*
 * Modules
 */
 var nconf = require('nconf');
 var strformat = require('strformat');

/**
 * API security steps
 */

module.exports = function() {

	var Given = When = Then = this.defineStep;

	/**
	 * ... and security query param '$param' equals '$value'
	 */
	Given(/security query param "([^"]*)" equals "([^"]*)"$/, function (param, value, callback) {

		// get the API definition
		var api = this.Api.getDefinition();

		// get the security instance
		var security = api.security;

		// add the query param
		security.params.query[param] = value;

		callback();
	});

	/**
	 * ... and security query param '$param' equals '$value'
	 */
	Given(/security header param "([^"]*)" equals "([^"]*)"$/, function (param, value, callback) {

		// get the API definition
		var api = this.Api.getDefinition();

		// replace any placeholders
		value = strformat(value, nconf.get());

		// get the security instance
		var security = api.security;

		// add the query param
		security.params.headers[param] = value;

		callback();
	});

};
