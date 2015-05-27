/*
 * Modules
 */
var expect = require('chai').expect;
var assert = require('chai').assert;

module.exports = function() {
	
	var Given = When = Then = this.defineStep;
	

	/**
	 * Given an operation with Id {operationId}
	 */
	Given(/ operation with Id "([^"]*)"$/, function (operationId, cb) {
	
		/*
		 * get the API operation instance by Id
		 */
		var operation = this.Api.getOperation( operationId );
		
		// check if found
		assert.isNotNull( operation, "An operation with Id [" + operationId + "] was not found in the API definition" );
	
		cb();
		
	});
	
	
	/**
	 * Given the endpoint "$endpoint"
	 */
	Given(/endpoint "([^"]*)" and method "([^"]*)"$/, function(endpoint, method, cb) {
		
		// get the operation instance by path
		var operation = this.Api.getOperation( undefined, endpoint, method.toLowerCase() );
	
		// check if found
		assert.isNotNull( operation, "An operation with path [" + endpoint + "] was not found in the API definition" );
		
		cb();
		
	});
	
	
	
};
