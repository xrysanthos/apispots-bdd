/**
 * Extension of the ApiDefinition module that
 * connects with generic RESTful API definitions.
 */

/*
 * Modules
 */
var unirest = require('unirest');

var ApiDefinition = require('../ApiDefinition');
var expect = require('chai').expect;
var ApiOperation = require('../ApiOperation');

function RestApiDefinition() {

	var THIS = {};

	THIS.__proto__ = ApiDefinition();

	/**
	 * Override the default parse method.
	 */
	THIS.parseDefinition = function( url, cb ){
		try {

			THIS.url = url;

			/*
			 * in generic rest mode no parsing is involved
			 */
			return cb();


		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * Returns an operation instance.
	 */
	THIS.getOperation = function( spec, endpoint, method ){
		try {

			/* spec is undefined in this case */

			/*
			 * create a new ApiOperation instance and fill in the attributes
			 */
			var op = new ApiOperation();

			// get the scheme from the URL
			var url = THIS.url;
			var parts = url.split('://');
			op.scheme = parts[0];

			// set base URL
			op.baseUrl = parts[1];

			// set endpoint and method
			op.path = endpoint;
			op.method = method;

			// return the operation instance
			return op;

		} catch (e) {
			console.error(e);
		}
	}

	/*
	 * Public
	 */
	return THIS;


};

module.exports = RestApiDefinition;
