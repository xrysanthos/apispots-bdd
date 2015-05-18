/*
 * Modules
 */
var expect = require('chai').expect;
var assert = require('chai').assert;

module.exports = function() {
	
	var Given = When = Then = this.defineStep;
	
	/**
	 * response code is '$code'
	 */
	Then(/^response code is "([^"]*)"$/, function (code, callback) {
		
		// get the current operation
		var op = this.Api.getCurrentOperation();
		
		expect(op.response).not.to.be.null;
		
		if ( isNaN( code ) )
			return callback.fail('Response code should be a valid number');
		
		expect(op.response.code).to.eq(Number(code));
		
		callback();
	});
	

	/**
	 * response status is '$status'
	 */
	Then(/^response status is "([^"]*)"$/, function (status, callback) {
		
		// get the current operation
		var op = this.Api.getCurrentOperation();
		expect(op.response).not.to.be.null;
		
		var statuses = ['info', 'ok', 'clientError', 'serverError', 'accepted', 'noContent', 'badRequest', 'unauthorized', 'notAcceptable', 'notFound', 'forbidden', 'error'];
		
		if (! isNaN( status ) )
			return callback.fail('Response status should not be a number, but one of [' + statuses + ']');
		
		if ( statuses.indexOf( status ) == -1 )
			return callback.fail('Response status should be one of [' + statuses + ']');
		
		expect(op.response[status]).to.be.true;
		
		callback();
	});
	
	/**
	 * ... response has time out error
	 */
	Then(/^response has time out error$/, function (callback) {
		var op = this.Api.getCurrentOperation();
		expect(op.response).not.to.be.null;
		
		if (! op.response.error)
			return callback.fail('Response has no error codes');
		
		expect(op.response.error).to.have.deep.property('code', 'ETIMEDOUT');
		
		callback();
	});
	
	/**
	 * ... response body has attributes [table]
	 */
	Then(/^response body has attributes$/, function (table, callback) {
		
		var op = this.Api.getCurrentOperation();
		expect(op.response).not.to.be.null;
		
		// get the response body
		var body = op.response.body;

		/*
		 * go through the attributes / values 
		 * from the table 
		 */
		for (var idx in table.rows())
		{
			var row = table.rows()[idx];
			var attribute = row[0];
			var value = row[1];
	
			// assert that attribute has the given value
			expect(body).to.have.deep.property(attribute, value);
		}
		
		callback();
	});
	
	
};
